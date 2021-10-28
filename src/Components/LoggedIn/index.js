import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router";
import Navbar from "../Navbar/index";

export default function LoggedInUserPage(props) {
  const messageArray = [...props.receivedMessages, ...props.sentMessages];
  const auth = getAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();

  function logOut() {
    signOut(auth);
    localStorage.removeItem("user");
    history.push("/");
  }
  return (
    <div className="homepage">
      <div>
        <Navbar />
      </div>
      <h2>Hi {user.name}</h2>
      <div className="homepage" style={{ height: "auto" }}>
        <div>
          <Link to="/status">
            <button type="button">Set Status</button>
          </Link>
        </div>
        <br></br>
        <div>
          <Link to="/newMessage">
            <button>Send a message</button>
          </Link>
        </div>
        <br></br>
        <div className="messagebox">
          {messageArray.map((message) => {
            return message.receiverUID === user.uid ? (
              <Link
                style={{
                  textDecoration: "none",
                }}
                to={`/message/${message.messageID}`}
                key={message.messageID}
              >
                <p
                  className="license-plate-chat-main"
                  style={{
                    border: "1px solid black",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  Message from {message.senderLicensePlate}{" "}
                  <span
                    style={{
                      color: message.response !== "" ? "green" : "red",
                      border:
                        message.response !== ""
                          ? "1px solid green"
                          : "1px solid red",
                      borderRadius: "5px",
                      padding: "2px",
                    }}
                  >
                    {message.response !== "" && "✅ Replied"}
                    {message.response === "" && "⏱ Awaiting your response"}
                  </span>
                </p>
              </Link>
            ) : (
              <Link
                style={{
                  textDecoration: "none",
                }}
                to={`/message/${message.messageID}`}
                key={message.messageID}
              >
                <p
                  className="license-plate-chat-main"
                  style={{
                    border: "1px solid black",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  Message to {message.receiverLicensePlate}{" "}
                  <span
                    style={{
                      color: message.response !== "" ? "green" : "red",
                      border:
                        message.response !== ""
                          ? "1px solid green"
                          : "1px solid red",
                      borderRadius: "5px",
                      padding: "2px",
                    }}
                  >
                    {message.response !== "" && "✅ Replied"}
                    {message.response === "" && "⏱ Awaiting response"}
                  </span>
                </p>
              </Link>
            );
          })}
        </div>
        <button onClick={logOut}>Logout</button>
      </div>
    </div>
  );
}
