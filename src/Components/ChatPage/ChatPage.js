import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { collection, where, query, onSnapshot } from "@firebase/firestore";
import db from "../../firebase";
import MessageToBeResponded from "./MessageToBeResponded";
import MessageResponded from "./MessageResponded";
import MessageReceived from "./MessageReceived";
import "./chatpage.css";
import Navbar from "../Navbar/index.js";

export default function ChatPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { messageID } = useParams();
  const [messageObj, setMessageObj] = useState();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "messages"),
      where("messageID", "==", messageID)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // let retrieveMessage = {};
      querySnapshot.forEach((doc) => {
        // retrieveMessage = { ...doc.data() };
        setMessageObj(doc.data());
      });
      //  setMessageObj(retrieveMessage);
      // return retrieveMessage;
    });

    return unsubscribe;
    // eslint-disable-next-line
  }, []);

  if (!messageObj) {
    return (
      <div className="container">
        <Navbar />
        <div style={{ textAlign: "center" }}>
          <h1>Loading</h1>
        </div>
      </div>
    );
  }

  if (messageObj.receiverUID === user.uid && messageObj.response === "") {
    return <MessageToBeResponded message={messageObj} />;
  }

  if (messageObj.receiverUID === user.uid && messageObj.response !== "") {
    return <MessageResponded message={messageObj} />;
  }

  if (messageObj.senderUID === user.uid && messageObj.response !== "") {
    return <MessageResponded message={messageObj} />;
  }

  if (messageObj.senderUID === user.uid && messageObj.response === "") {
    return <MessageReceived message={messageObj} />;
  }
}
