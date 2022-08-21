import React from 'react';

export default function NavbarNewMessage() {
  function goBack() {
    window.history.back();
  }
  return (
    <div>
      <ul>
        <li onClick={goBack}>Back</li>
        <li>New Message</li>
        <li>Notify</li>
      </ul>
    </div>
  );
}
