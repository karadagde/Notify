import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../firebase";
import NotLoggedIn from "../Components/Navbar/Unauth";

export default function Login() {
  const history = useHistory();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  console.log("am I at login Component?");

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const token = await userCredential.user.getIdToken();
        const userRef = collection(db, "users");
        const q = query(userRef, where("uid", "==", userCredential.user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
          localStorage.setItem(
            "user",
            JSON.stringify({
              // email: email,
              // uid: userCredential.user.uid,
              // licensePlate: user.licensePlate,
              // location: user.location,
              // status: user.status,
              // name: user.name,
              ...doc.data(),
              token,
            })
          );
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  useEffect(() => {
    if (user !== null) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <div>
      <div className="container-login">
        <NotLoggedIn />
        <h2 style={{ textAlign: "center" }}>Welcome to Notify</h2>
        <br></br>
        <div>
          <form onSubmit={handleSubmit}>
            <label for="email">Email</label>
            <br></br>
            <input
              id="email"
              minLength="7"
              maxLength="50"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <br></br>
            <label for="password">Password</label>
            <br></br>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              minLength="6"
              required
            ></input>
            <br></br>
            <button type="submit">Sign in</button>
            <p>If you don't have an account, signup here</p>
            <Link to="/signup">
              <button>Signup here!</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
