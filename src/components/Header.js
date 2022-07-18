import React, { useState } from "react";

function Header() {
  const [toggleLogout, setToggleLogout] = useState(false);

  return (
    <div className="py-4 flex items-center justify-between">
      <section className="header-left flex gap-8 items-center">
        <a href="/">
          <img src="./logo.png" alt="Movies Logo" className="w-10" />
        </a>

        <div className="navigation flex gap-6">
          <button>Home</button>
          <button>Series</button>
          <button>Movies</button>
          <button>New & Popular</button>
          <button>My List</button>
        </div>
      </section>

      <section className="header-right flex gap-8">
        <button className="bg-red-700 py-2 px-4 rounded-sm">Login</button>
        {/* <div className="flex items-center relative">
          <input
            type="text"
            placeholder="Search Thor"
            className="p-2 bg-zinc-900 border border-zinc-500"
          />
          <button className="absolute right-1 p-2 bg-zinc-900">
            <img src="./ic_search.svg" alt="Icon Search" />
          </button>
        </div>
        <button className="relative">
          <div
            onClick={() => setToggleLogout(!toggleLogout)}
            className="cursor-pointer flex items-center gap-2 "
          >
            <p>Ari Alghifari</p>
            <img src="./profile_image.png" alt="Icon Search" className="w-8" />
            <img src="./ic_arrow_down.svg" alt="Icon Arrow Down" />
          </div>

          <div
            className={
              toggleLogout
                ? "absolute right-0 top-10 bg-zinc-800 py-2 px-4"
                : "hidden"
            }
          >
            Logout
          </div>
        </button> */}
      </section>
    </div>
  );
}

export default Header;
