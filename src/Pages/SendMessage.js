import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  //getDoc,
} from 'firebase/firestore';
import db from '../firebase';
import MapContainer from '../Components/Maps/MapContainer';
import { useHistory } from 'react-router';
import NavbarNewMessage from '../Components/Navbar/NavbarNewMessage';
import { Alert } from '@mui/material';
import distance from '../Components/DistanceCalculator';

export default function SendMessage() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [inputLicensePlate, setInputLicensePlate] = useState('');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const history = useHistory();
  const [lpError, setLpError] = useState(false);

  const handleLicensePlateInput = (event) => {
    const upperCaseLisencePlate = event.target.value;
    const value = upperCaseLisencePlate.toUpperCase();
    setInputLicensePlate(value);
  };

  useEffect(() => {
    (async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    })();
  }, [longitude, latitude]);

  const SendMessage = async () => {
    /// check if licenseplate is registered
    // reference to users collection
    const userRef = collection(db, 'users');
    //query for the collection
    const q = query(userRef, where('licensePlate', '==', inputLicensePlate));
    try {
      const querySnapshot = await getDocs(q);
      let found_users = null;
      let currentD;
      // eslint-disable-next-line no-unused-vars
      const receiverProfile = querySnapshot.forEach(async (userDoc) => {
        found_users = userDoc.data();
        currentD =
          distance(
            latitude,
            userDoc.data().location[0],
            longitude,
            userDoc.data().location[1]
          ) * 1000;
        const receiverID = userDoc.data().uid;
        // eslint-disable-next-line no-unused-vars
        const receiverLicensePlate = await userDoc.data().licensePlate;
        const convID = user.uid + receiverID;
        const timeStamp = new Date();
        if (userDoc.data().status !== '') {
          currentD =
            distance(
              latitude,
              userDoc.data().location[0],
              longitude,
              userDoc.data().location[1]
            ) * 1000;
          if (currentD > 100) {
            return setLpError(
              `We could not verify that you are at the same location with ${receiverLicensePlate}. Please make it sure that you are close to the car that you want to contact.`
            );
          } else {
            await setDoc(doc(db, 'messages', convID), {
              messageID: convID,
              request:
                'Hi,I would like to use the charging spot that you are using now. What time will you be leaving this spot?',
              senderUID: user.uid,
              senderLicensePlate: user.licensePlate,
              response: {
                date: found_users.status.date,
                time: found_users.status.time,
              },
              receiverUID: receiverID,
              receiverLicensePlate: userDoc.data().licensePlate,
              requestDateTime: timeStamp.toLocaleString(),
            });
          }
        } else {
          // eslint-disable-next-line no-unused-vars
          const newMessage = await setDoc(doc(db, 'messages', convID), {
            messageID: convID,
            request:
              'Hi,I would like to use the charging spot that you are using now. What time will you be leaving this spot?',
            senderUID: user.uid,
            senderLicensePlate: user.licensePlate,
            response: '',
            receiverUID: receiverID,
            receiverLicensePlate: userDoc.data().licensePlate,
            requestDateTime: timeStamp.toLocaleString(),
          });
        }
      });
      if (found_users === null) {
        setLpError(
          'Unfortunately this EV owner does not use our app. Please be sure that you wrote the correct licence plate'
        );
        setTimeout(() => setLpError(false), 5000);
        setTimeout(() => setInputLicensePlate(''), 5000);
      } else if (currentD > 100 && longitude) {
        setLpError(
          `We could not verify that you are at the same location with ${inputLicensePlate}. Please make it sure that you are close to the car that you want to contact.`
        );
        setTimeout(() => setLpError(false), 5000);
      } else {
        history.push('/');
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="send-message">
      <NavbarNewMessage />
      <h2>License Plate</h2>
      <input
        minLength="6"
        maxLength="6"
        className="license-plate"
        value={inputLicensePlate}
        type="text"
        onChange={handleLicensePlateInput}
        required
      />
      {lpError ? <Alert severity="error">{lpError}</Alert> : <></>}
      <div className="send-message">
        <br></br>
        <MapContainer />
        <p>
          <span>Your Message:</span> Hey green energy user,I would like to use
          this charging spot. What time will you be leaving this spot?
        </p>
        <button id="send_button" onClick={() => SendMessage()}>
          Send
        </button>
      </div>
    </div>
  );
}
