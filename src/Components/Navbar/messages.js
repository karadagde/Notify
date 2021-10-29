import React from "react";
import "./index.css";

export default function NavbarMessages(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  console.log(props, "wtf is wrong again");
  function goBack() {
    window.history.back();
  }
  return (
    <div>
      <ul>
        <li onClick={goBack}>Back</li>
        {user.uid === props.message.senderUID ? (
          <li style={{ fontSize: "22px" }}>
            Message with {props.message.receiverLicensePlate}
          </li>
        ) : (
          <li style={{ fontSize: "22px" }}>
            Message with {props.message.senderLicensePlate}
          </li>
        )}
        <li>Notify</li>
      </ul>
    </div>
  );
}
