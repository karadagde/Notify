import React from "react";
import NavbarMessages from "../Navbar/messages";

export default function MessageResponded(props) {
  const messageObj = props.message;
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <NavbarMessages message={messageObj} />
      <div className="chat-page">
        <div
          className={
            user.uid === messageObj.senderUID
              ? "container-chat"
              : "container-chat-left"
          }
        >
          <p className="license-plate-chat">{messageObj.senderLicensePlate}</p>
          <p style={{ textAlign: "left" }}>{messageObj.request}</p>
          <span>{messageObj.requestDateTime}</span>
        </div>
        <div
          className={
            user.uid !== messageObj.senderUID
              ? "container-chat"
              : "container-chat-left"
          }
        >
          <p className="license-plate-chat">
            {messageObj.receiverLicensePlate}
          </p>
          {messageObj.response.date ? (
            <p style={{ textAlign: "left" }}>
              On {messageObj.response.date} at {messageObj.response.time}
            </p>
          ) : (
            <p style={{ textAlign: "left" }}>{messageObj.response}</p>
          )}
          <span>{messageObj.requestDateTime}</span>
        </div>
      </div>
    </div>
  );
}
