import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  signinStart,
  signinSuccess,
  signinFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../components/Oauth";

const SignUp = () => {
  const [formData, setFormdata] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      dispatch(signinStart);
      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        formData
      );
      console.log(res);
      if (res.data.success === true) {
        toast.success(res.data.message);
        dispatch(signinSuccess(res.data));
        navigate("/");
      }
      if (res.data.success === false) {
        dispatch(signinFailure(res.data));
        toast.error(res.data.message);
      }
    } catch (error) {
      // setLoading(false);
      dispatch(signinFailure(error));
      toast.error("Something went wrong !!");
    }
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col">
      <h1 className="text-4xl text-center font-semibold my-8">Sign In</h1>
      <form className="flex flex-col gap-4 mt-4 p-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-2 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-2 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue-800 text-white rounded-lg mt-8 p-2 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading...." : "Sign in"}
        </button>
        <Oauth />
      </form>
      <div className="flex p-4 gap-2">
        <p>Don't Have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-800">Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
