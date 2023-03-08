import { generatePrivateKey, getPublicKey, relayInit } from "nostr-tools";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./Main";
import Nav from "./Nav";

function App() {
  const [relay, setRelay] = useState(null);

  const [privatekey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [openTab, setOpenTab] = useState(1);

  const handleGeneratePrivateKey = () => {
    const privateKey = generatePrivateKey();
    setPrivateKey(privateKey);
    setPublicKey(getPublicKey(privateKey));
  };

  const connectRelay = async () => {
    const relay = relayInit("wss://relay.damus.io");
    await relay.connect();

    relay.on("connect", () => {
      setRelay(relay);
      navigate(`/${privatekey}`);
      setShowModal(false);
    });
    relay.on("error", () => {
      console.log("failed to connect");
    });
  };

  const navigate = useNavigate();
  return (
    <>
      <div>
        <Nav setShowModal={setShowModal} />
        <div className="bg-darkblue flex-1">
          {showModal && (
            <>
              <div
                className="absolute top-0 left-0 h-full w-full bg-verydark bg-opacity-50"
                onClick={() => setShowModal(false)}
              ></div>
              {/* <Modal /> */}
              <div className="rounded relative w-1/2 bg-transparent bg-opacity-40 p-5 my-5 mx-auto">
                <p className="text-transparent my-2 font-mono font-semibold">
                  Welcome to Dostr
                </p>

                <div className="flex flex-wrap">
                  <div className="w-full">
                    <ul
                      className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                      role="tablist"
                    >
                      <li className="-mb-px flex-auto text-center">
                        <a
                          className={`
                  text-xs font-bold uppercase px-5 py-3 shadow-lg bg-darkblue  rounded block leading-normal border border-transparent
                  ${
                    openTab === 1
                      ? "border-opacity-100 text-transparent"
                      : "border-opacity-0 bg-opacity-70 text-transparent text-opacity-50"
                  }
                `}
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenTab(1);
                          }}
                          data-toggle="tab"
                          href="#link1"
                          role="tablist"
                        >
                          public key
                        </a>
                      </li>
                      <li className="-mb-px flex-auto text-center">
                        <a
                          className={`
                  text-xs font-bold uppercase px-5 py-3 shadow-lg bg-darkblue  rounded block leading-normal border border-transparent
                  ${
                    openTab === 2
                      ? "border-opacity-100 text-transparent"
                      : "border-opacity-0 bg-opacity-70 text-transparent text-opacity-50"
                  }
                `}
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenTab(2);
                          }}
                          data-toggle="tab"
                          href="#link2"
                          role="tablist"
                        >
                          private key
                        </a>
                      </li>
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                      <div className="px-4 py-5 flex-auto">
                        <div className="tab-content tab-space">
                          <div
                            className={openTab === 1 ? "block" : "hidden"}
                            id="link1"
                          >
                            <div className="w-full flex items-center justify-between py-0.5 px-3 pr-1.5 rounded border border-darkblue border-opacity-40 focus-within:border-opacity-100">
                              <input
                                type="text"
                                placeholder="Enter public key"
                                value={publicKey}
                                className="rounded-l flex-1 focus:outline-none texts-sm text-verydark py-1 mr-1.5"
                              />
                              {publicKey.trim() !== "" &&
                              privatekey.trim() !== "" ? (
                                <button
                                  onClick={connectRelay}
                                  className="uppercase text-darkblue font-serif tracking-wider text-sm rounded w-1/4 bg-lightblue bg-opacity-70 hover:bg-opacity-100 p-1.5 transition ease-in duration-300"
                                >
                                  Connect
                                </button>
                              ) : (
                                <button
                                  onClick={handleGeneratePrivateKey}
                                  className="uppercase text-transparent text-sm rounded w-1/4 bg-darkblue bg-opacity-70 hover:bg-opacity-100 p-1.5 transition ease-in duration-300"
                                >
                                  Generate keys
                                </button>
                              )}
                            </div>
                          </div>
                          <div
                            className={openTab === 2 ? "block" : "hidden"}
                            id="link2"
                          >
                            <div className="w-full relative flex items-center justify-between py-0.5 px-3 pr-1.5 rounded border border-darkblue border-opacity-40 focus-within:border-opacity-100">
                              <input
                                type="text"
                                placeholder="Enter private key"
                                className="rounded-l flex-1 focus:outline-none texts-sm text-verydark py-1 mr-1.5"
                                value={privatekey}
                              />
                              {publicKey.trim() !== "" &&
                              privatekey.trim() !== "" ? (
                                <button
                                  onClick={connectRelay}
                                  className="uppercase text-darkblue font-serif tracking-wider text-sm rounded w-1/4 bg-lightblue bg-opacity-70 hover:bg-opacity-100 p-1.5 transition ease-in duration-300"
                                >
                                  Connect
                                </button>
                              ) : (
                                <button
                                  onClick={handleGeneratePrivateKey}
                                  className="uppercase text-transparent text-sm rounded w-1/4 bg-darkblue bg-opacity-70 hover:bg-opacity-100 p-1.5 transition ease-in duration-300"
                                >
                                  Generate keys
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-darkblue text-transparent uppercase rounded hover:bg-opacity-75 transion ease-in-out py-2.5 duration-300 hover:translate-y-1">
                  Connect with EVM
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Routes>
        <Route
          path="/:id"
          element={<Main pubkey={publicKey} skey={privatekey} relay={relay} />}
        />
      </Routes>
    </>
  );
}

export default App;
