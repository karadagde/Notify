import React from "react";
import MapContainer from "../Components/Maps/MapContainer";
import { useState, useEffect } from "react";
import moment from "moment";
import db from "../firebase";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import Status from "../Components/Navbar/status";

export default function SetStatus() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [time, setTime] = useState(moment().format("HH:mm"));
  const [statusInfo, setStatusInfo] = useState(null);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    (async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    })();
  }, []);

  const userRef = doc(db, "users", user.uid);

  useEffect(() => {
    const getStatus = async () => {
      const docSnap = await getDoc(userRef);
      let info = docSnap.data();
      setStatusInfo(info);
    };
    return getStatus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusInfo]);

  const setStatus = async () => {
    await updateDoc(userRef, {
      status: { date, time },
      location: [latitude, longitude],
    });
  };

  const resetStatus = async () => {
    await updateDoc(userRef, {
      status: "",
      location: [],
    });
  };

  if (statusInfo === null) {
    return (
      <div className="status-page">
        <Status />
        <h4>Loading</h4>
      </div>
    );
  } else {
    return statusInfo.status === "" ? (
      <div className="status-page">
        <Status />
        <h2>I am parking my car:</h2>
        <MapContainer coordinates={{ latitude, longitude }} />
        <p>I expect to leave this location by</p>
        <input
          type="date"
          defaultValue={date}
          onChange={(e) => setDate(e.target.value)}
        />{" "}
        <input
          type="time"
          defaultValue={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button onClick={setStatus}>Set status</button>
      </div>
    ) : (
      <div className="status-page">
        <Status />
        <h2>I parked my car at</h2>
        <MapContainer coordinates={{ latitude, longitude }} />
        <p>
          I expect to leave this location by {statusInfo.status.time} on{" "}
          {statusInfo.status.date}{" "}
        </p>
        <button onClick={resetStatus}>Reset status</button>
      </div>
    );
  }
}
