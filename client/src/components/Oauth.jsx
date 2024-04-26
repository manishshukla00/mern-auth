import React, { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/user/userSlice";

const Oauth = () => {
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const googleData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };
      const res = await axios.post(
        "http://localhost:3000/api/auth/google",
        googleData
      );
      console.log(res);
      dispatch(signinSuccess(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-2 uppercase hover:opacity-95"
    >
      Continue with google
    </button>
  );
};

export default Oauth;
