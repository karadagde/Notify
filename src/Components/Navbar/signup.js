import React from "react";
import "./index.css";

export default function NavSignUp() {
  function goBack() {
    window.history.back();
  }
  return (
    <div>
      <ul>
        <li onClick={goBack}>Back</li>
        <li>Notify</li>
      </ul>
    </div>
  );
}
