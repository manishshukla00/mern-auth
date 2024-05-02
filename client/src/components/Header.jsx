import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  const imageUrl =
    "https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png";

  return (
    <div className="bg-slate-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to={"/"}>
          <h1 className="font-bold">Auth App</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/about"}>
            <li>About</li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={currentUser.profilePicture || imageUrl}
                alt="user-image"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
