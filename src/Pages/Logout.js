import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router";

export default function Logout() {
  const auth = getAuth();
  const history = useHistory();
  const user = auth.currentUser;

  const logOut = async () => {
    signOut(auth);
    localStorage.setItem("token", null);
    history.push("/");
  };

  return (
    <div>
      <button onClick={logOut}>Logout</button>
    </div>
  );
}
