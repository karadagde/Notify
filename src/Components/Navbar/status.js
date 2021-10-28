import React from "react";
import "./index.css";

export default function Status(props) {
  function goBack() {
    window.history.back();
  }
  return (
    <div>
      <ul>
        <li onClick={goBack}>Back</li>
        <li>Status</li>
        <li>Notify</li>
      </ul>
    </div>
  );
}
