import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../firebase';
import NotLoggedIn from '../Components/Navbar/Unauth';

export default function Login() {
  const history = useHistory();
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const token = await userCredential.user.getIdToken();
        const userRef = collection(db, 'users');
        const q = query(userRef, where('uid', '==', userCredential.user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
          sessionStorage.setItem(
            'user',
            JSON.stringify({
              // email: email,
              // uid: userCredential.user.uid,
              // licensePlate: user.licensePlate,
              // location: user.location,
              // status: user.status,
              // name: user.name,
              ...doc.data(),
              token,
            })
          );
        });
        history.push('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  useEffect(() => {
    if (user !== null) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, history]);
  return (
    <div>
      <div className="container-login">
        <NotLoggedIn />
        <h2 style={{ textAlign: 'center' }}>Welcome to Notify</h2>
        <br></br>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <br></br>
            <input
              id="email"
              minLength="7"
              maxLength="50"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <br></br>
            <label htmlFor="password">Password</label>
            <br></br>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              minLength="6"
              required
            ></input>
            <br></br>
            <button type="submit">Sign in</button>
            <p>If you don't have an account, signup here</p>
            <Link to="/signup">
              <button>Signup here!</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
