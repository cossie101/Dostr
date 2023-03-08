import React from "react";
import { BiLogIn } from "react-icons/bi";

import Logo from "./assets/logo-modified.png";

const Nav = ({ setShowModal }) => {
  return (
    <nav className="flex w-full bg-darkblue bg-opacity-25 justify-between items-center py-6 px-16">
      <div className="">
        <img src={Logo} alt="" className="h-16" />
      </div>
      <div className="">
        {/* {isConnected ? (
          <div className="flex items-center justify-between gap-2 rounded px-3 py-2.5 bg-darkblue text-transparent font-serif text-sm tracking-wide bg-opacity-70 hover:bg-opacity-100 transition-all ease-in-out duration-300">
            <img src="" alt="" />
            <p>{public_key}</p>
          </div>
        ) : ( */}
        <button
          onClick={() => setShowModal(true)}
          className="rounded flex gap-1 items-center justify-between px-3 py-2.5 bg-darkblue text-transparent font-serif text-sm tracking-wide bg-opacity-70 hover:bg-opacity-100 transition-all ease-in-out duration-300"
        >
          <BiLogIn className="text-lg" />
          Set User
        </button>
        {/* )} */}
      </div>
    </nav>
  );
};

export default Nav;
