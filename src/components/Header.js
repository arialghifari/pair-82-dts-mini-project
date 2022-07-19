import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
  const [toggleLogout, setToggleLogout] = useState(false);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const onLogout = async () => {
    try {
      await signOut(auth);
      setToggleLogout(false);
      navigate("/login");
    } catch (error) {}
  };

  return (
    <div className="py-4 flex items-center justify-between">
      <section className="header-left flex gap-8 items-center">
        <Link to="/">
          <img src="./logo.png" alt="Movies Logo" className="w-10" />
        </Link>

        <div className="navigation flex gap-6">
          <Link to="/">Home</Link>
          <button>Series</button>
          <button>Movies</button>
          <button>New & Popular</button>
          <button>My List</button>
        </div>
      </section>

      <section className="header-right flex gap-8">
        <div className="flex items-center relative">
          <input
            type="text"
            placeholder="Search Thor"
            className="p-2 bg-zinc-900 border border-zinc-500"
          />
          <button className="absolute right-1 p-2 bg-zinc-900">
            <img src="./ic_search.svg" alt="Icon Search" />
          </button>
        </div>
        
        {user ? (
          <button className="relative">
            <div
              onClick={() => setToggleLogout(!toggleLogout)}
              className="cursor-pointer flex items-center gap-2 "
            >
              <p>{user.email}</p>
              <img
                src="./profile_image.png"
                alt="Icon Search"
                className="w-8 rounded-sm"
              />
              <img src="./ic_arrow_down.svg" alt="Icon Arrow Down" />
            </div>

            <div
              onClick={onLogout}
              className={
                toggleLogout
                  ? "absolute right-0 top-10 bg-zinc-800 py-2 px-4"
                  : "hidden"
              }
            >
              Logout
            </div>
          </button>
        ) : (
          <Link to="/login" className="bg-red-700 py-2 px-4 rounded-sm">
            Login
          </Link>
        )}
      </section>
    </div>
  );
}

export default Header;
