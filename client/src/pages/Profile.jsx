import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  console.log(formData);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
        setFormData({ ...formData, profilePicture: downloadURL })
      );
    });
  };

  return (
    <div className="max-w-lg mx-auto font-semibold text-center p-4">
      <h1 className="text-4xl my-4">Profile</h1>
      <form className="flex flex-col gap-8">
        <input
          type="file"
          onClick={(e) => setImage(e.target.files[0])}
          ref={fileRef}
          accept="image/*"
          hidden
        />
        <img
          src={currentUser.profilePicture}
          alt="profile"
          className="w-20 h-20 self-center cursor-pointer rounded-full object-cover my-4"
          onClick={() => fileRef.current.click()}
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
