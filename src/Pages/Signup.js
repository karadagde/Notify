import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Redirect } from 'react-router';
import db from '../firebase';
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import NavSignUp from '../Components/Navbar/signup';
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function Signup() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('user'))
  );
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [password, setPassword] = useState('');
  const [lpError, setLpError] = useState(false);
  const auth = getAuth();

  const handleLicensePlateInput = (event) => {
    const upperCaseLisencePlate = event.target.value;
    const value = upperCaseLisencePlate.toUpperCase();
    setLicensePlate(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userRef = collection(db, 'users');
    let found_users = null;
    const q = query(userRef, where('licensePlate', '==', licensePlate));
    try {
      const response = await axios.get(
        `https://opendata.rdw.nl/resource/8ys7-d773.json?$$app_token=${process.env.REACT_APP_RDW_APP_TOKEN}&kenteken=${licensePlate}`
      );
      if (response.data.length === 0) {
        setLpError(
          'Your License Plate is not registered in RDW system. Please check your details or try to register sometime later!'
        );
        setTimeout(() => setLpError(false), 6000);
      } else if (
        response.data.length !== 0 &&
        response.data[0].brandstof_omschrijving !== 'Elektriciteit'
      ) {
        setLpError(
          'Your car is not registered as an EV. This app can only be used for EVs'
        );
        setTimeout(() => setLpError(false), 6000);

        //   return;
      } else {
        const querySnapshot = await getDocs(q);
        // eslint-disable-next-line no-unused-vars
        const receiverProfile = querySnapshot.forEach(async (userDoc) => {
          found_users = userDoc.data();
        });
        if (found_users !== null) {
          setLpError(
            'This license plate already has been registered under another account in our system. Please check your details'
          );
          setTimeout(() => setLpError(false), 6000);

          //  return;
        } else {
          createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
              const user = userCredential.user;
              const token = await userCredential.user.getIdToken();
              // Signed in
              // eslint-disable-next-line no-unused-vars
              const userData = setDoc(
                doc(db, 'users', userCredential.user.uid),
                {
                  name: name,
                  email: email,
                  licensePlate: licensePlate,
                  location: [],
                  status: '',
                  uid: userCredential.user.uid,
                }
              );
              sessionStorage.setItem(
                'user',
                JSON.stringify({
                  name: name,
                  email: email,
                  uid: userCredential.user.uid,
                  location: [],
                  status: '',
                  licensePlate: licensePlate,
                  token,
                })
              );
              setCurrentUser(user);
              setEmail('');
              setName('');
              setLicensePlate('');
              setPassword('');
            })
            .catch((err) => {
              if (err.code === 'auth/email-already-in-use') {
                setLpError(
                  'This email is already registered. Please go back to previous page to sign in'
                );
                setTimeout(() => setLpError(false), 6000);
              }
            });
        }
      }
    } catch (error) {
      //   const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container-signup">
      <NavSignUp />
      <form onSubmit={handleSubmit}>
        <h3>Please fill in your details to register</h3>
        {lpError ? (
          <Alert severity="warning" style={{ margin: '5px' }}>
            {lpError}
          </Alert>
        ) : (
          <></>
        )}
        <label for="name">Name</label>
        <br></br>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        ></input>
        <br></br>
        <label for="email">Email</label>
        <br></br>
        <input
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <br></br>
        <label for="licensePlate">License plate</label>
        <br></br>
        <input
          id="licensePlate"
          minLength="6"
          maxLength="8"
          type="text"
          value={licensePlate}
          // onChange={(e) => setLicensePlate(e.target.value)}
          onChange={handleLicensePlateInput}
          required
        ></input>
        <br></br>
        <label for="password">Password</label>
        <br></br>
        <input
          id="password"
          type="password"
          minLength="6"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <br></br>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
