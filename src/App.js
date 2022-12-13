import { Container } from "@material-ui/core";
import React from "react";

import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/signIn" element={<SignIn />} />
          <Route path="/auth/signUp" element={<SignUp />} />
          <Route path="/changePassword" element={<ChangePassword />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
