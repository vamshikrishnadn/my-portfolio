import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Navbar/Header";
import Services from "./components/Services/Services";
import SingleVideo from "./components/Home/SingleVideo";
import Upload from "./components/Upload/Upload";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import userInfo from "./components/Account/userInfo";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/services" exact component={Services} />
        {/* <Route path="/single-video/:slug" element={<SingleVideo />} /> */}
        <Route path="/single-video" exact component={SingleVideo} />
        <Route path="/upload" exact component={Upload} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/user" exact component={userInfo} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
