import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/NotLoggedIn";
import SeeMessage from "./Pages/SeeMessage";
import SendMessage from "./Pages/SendMessage";
import SetStatus from "./Pages/SetStatus";
import Signup from "./Pages/Signup";

function App() {
  return (
    <div className="container">
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/status" component={SetStatus} />
        <Route path="/message/:messageID" component={SeeMessage} />
        <Route path="/newMessage" component={SendMessage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
