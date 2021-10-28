import React from "react";
import { useEffect, useState } from "react";

export default function MapContainer(props) {
  // eslint-disable-next-line no-unused-vars
  const [latitude, setLatitude] = useState(props.latitude);
  // eslint-disable-next-line no-unused-vars
  const [longitude, setLongitude] = useState(props.longitude);
  let [srcLink, setSrcLink] = useState("");

  useEffect(() => {
    (async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setSrcLink(
          `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=${position.coords.latitude},${position.coords.longitude}&center=${position.coords.latitude},${position.coords.longitude}&zoom=18`
        );
      });
    })();
  }, []);

  return (
    <div>
      <iframe
        title="veryspecial title"
        width="400"
        height="200"
        style={{ border: "2px solid black", borderRadius: "10px" }}
        loading="lazy"
        allowFullScreen
        src={srcLink}
      ></iframe>
    </div>
  );
}
