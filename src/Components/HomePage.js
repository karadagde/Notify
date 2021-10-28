import React, { useEffect, useState } from "react";
import LoggedInUserPage from "./LoggedIn";
import { Redirect } from "react-router";
import { collection, where, query, onSnapshot } from "@firebase/firestore";
import db from "../firebase";

export default function HomePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "messages"),
      where("receiverUID", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const recMessagesSnapshot = [];
      querySnapshot.forEach((doc) => {
        recMessagesSnapshot.push(doc.data());
      });
      console.log(recMessagesSnapshot, "this is unsub");
      setReceivedMessages(recMessagesSnapshot);
      return recMessagesSnapshot;
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "messages"),
      where("senderUID", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const sentMessagesSnapshot = [];
      querySnapshot.forEach((doc) => {
        sentMessagesSnapshot.push(doc.data());
      });
      console.log(sentMessagesSnapshot, "this is unsub");
      setSentMessages(sentMessagesSnapshot);
      return sentMessagesSnapshot;
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <LoggedInUserPage
        sentMessages={sentMessages}
        receivedMessages={receivedMessages}
      />
    </div>
  );
}
