import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
