import React from "react";

const Tabs = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
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
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <div className="w-full flex items-center justify-between py-0.5 px-3 pr-1.5 rounded border border-darkblue border-opacity-40 focus-within:border-opacity-100">
                    <input
                      type="text"
                      placeholder="Enter public key"
                      className="rounded-l flex-1 focus:outline-none texts-sm text-verydark py-1 mr-1.5"
                    />
                    <button className="uppercase text-transparent text-sm rounded w-1/4 bg-darkblue bg-opacity-70 hover:bg-opacity-100 p-1.5 transition ease-in duration-300">
                      Generate keys
                    </button>
                  </div>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <div className="w-full relative flex items-center justify-between py-0.5 px-3 pr-1.5 rounded border border-darkblue border-opacity-40 focus-within:border-opacity-100">
                    <input
                      type="text"
                      placeholder="Enter private key"
                      className="rounded-l flex-1 focus:outline-none texts-sm text-verydark py-1 mr-1.5"
                    />
                    <button className="uppercase text-transparent text-sm rounded w-1/4 bg-darkblue bg-opacity-70 hover:bg-opacity-100 p-1.5 transition ease-in duration-300">
                      Generate keys
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function TabsRender() {
  return (
    <>
      <Tabs />
    </>
  );
}
