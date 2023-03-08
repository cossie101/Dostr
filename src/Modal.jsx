import React from "react";

import TabsRender from "./Tabs";

const Modal = ({ showModal, setShowModal }) => {
  return (
    <div className="rounded relative w-1/2 bg-transparent bg-opacity-40 p-5 my-5 mx-auto">
      <p className="text-transparent my-2 font-mono font-semibold">
        Welcome to Dostr
      </p>
      {/* <a href="#" className="my-2 hover:bg-lightblue">
        Click here to learn about Nostr
      </a> */}

      <TabsRender />

      <button className="w-full bg-darkblue text-transparent uppercase rounded hover:bg-opacity-75 transion ease-in-out py-2.5 duration-300 hover:translate-y-1">
        Connect with EVM
      </button>
      {/* <button className="" onClick={() => setShowModal(false)}>
        <SlClose />
      </button> */}
    </div>
  );
};

export default Modal;
