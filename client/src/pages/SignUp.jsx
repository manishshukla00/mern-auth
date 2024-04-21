import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="max-w-lg mx-auto flex flex-col">
      <h1 className="text-4xl text-center font-semibold my-8">Sign Up</h1>
      <form className="flex flex-col gap-4 p-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-2 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-2 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-2 rounded-lg"
        />
        <button className="bg-blue-800 text-white rounded-lg p-2 uppercase hover:opacity-95 disabled:opacity-80">
          Sign up
        </button>
      </form>
      <div className="flex p-4 gap-2">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-800">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
