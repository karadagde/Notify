import React from "react";
import NavbarMessages from "../Navbar/messages";
export default function MessageReceived(props) {
  const messageObj = props.message;
  return (
    <div>
      <NavbarMessages message={messageObj} />
      <div className="chat-page">
        <div className="container-chat">
          <p className="license-plate-chat">{messageObj.senderLicensePlate}</p>
          <p>{messageObj.request}</p>
          <span className="time-right">{messageObj.requestDateTime}</span>
        </div>
        <div className="container-chat-left">
          <p className="license-plate-chat">
            {messageObj.receiverLicensePlate}
          </p>
          <p>No response yet</p>
        </div>
      </div>
    </div>
  );
}
