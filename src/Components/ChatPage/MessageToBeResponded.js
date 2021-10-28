import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import moment from "moment";
import db from "../../firebase";
import { doc, updateDoc } from "@firebase/firestore";
import NavbarMessages from "../Navbar/messages";

export default function MessageToBeResponded(props) {
  const { messageID } = useParams();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [time, setTime] = useState(moment().format("HH:mm"));

  const messageRef = doc(db, "messages", messageID);

  const replyWithDateTime = async () => {
    // Set the "capital" field of the city 'DC'
    const timeStamp = new Date();
    await updateDoc(messageRef, {
      response: { date, time },
      responseDateTime: timeStamp.toLocaleString(),
    });
  };

  const replyWithBadNews = async () => {
    await updateDoc(messageRef, {
      response:
        "I am sorry but I don't know when I can leave. It is best you look for somewhere else!",
    });
  };

  return (
    <div>
      <NavbarMessages message={props.message} />
      <div className="message-reply">
        <h3 style={{ textAlign: "center" }}>
          {props.message.senderLicensePlate} is asking what time are you leaving
          the charging spot?
        </h3>
        <button
          style={{
            width: "350px",
            backgroundColor: "#2663a075",
            border: "none",
          }}
          onClick={replyWithBadNews}
        >
          Sorry! I am not around now and I think I won't leave the spot anytime
          soon. It is better you look for somewhere else
        </button>
        <br></br>
        <p>I will be done at</p>
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
        <br></br>
        <div>
          <button onClick={replyWithDateTime}>Send</button>
        </div>
      </div>
    </div>
  );
}
