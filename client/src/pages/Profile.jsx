import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser.username);

  return (
    <div className="max-w-lg mx-auto font-semibold text-center p-4">
      <h1 className="text-4xl my-4">Profile</h1>
      <form className="flex flex-col gap-8">
        <img
          src={currentUser.profilePicture}
          alt="profile"
          className="w-20 h-20 self-center cursor-pointer rounded-full object-cover my-4"
        />
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-2"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-2"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-2"
        />
        <button className="bg-slate-800 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between items-center mt-4">
        <span className="text-red-800 cursor-pointer">Delete Account</span>
        <span className="text-red-800 cursor-pointer">Signout</span>
      </div>
    </div>
  );
};

export default Profile;
