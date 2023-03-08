import React, { useState } from "react";

import { getEventHash, signEvent } from "nostr-tools";

const Main = ({ skey, pubkey, relay }) => {
  const [pubStatus, setPubStatus] = useState("");
  const [newEvent, setNewEvent] = useState(null);
  const [events, setEvents] = useState(null);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setComment(comment);
    const pub = relay.publish(event);

    pub.on("ok", () => {
      setPubStatus("your event is published");
    });
    pub.on("failed", (reason) => {
      setPubStatus(`failed to publish message ${reason}`);
    });
  };

  var event = {
    kind: 1,
    pubkey: pubkey,
    created_at: Math.floor(Date.now() / 1000),
    tags: [],
    content: comment,
  };

  event.id = getEventHash(event);
  event.sig = signEvent(event, skey);

  const getEvent = async () => {
    var sub = relay.sub([
      {
        kinds: [1],
        authors: [pubkey],
      },
    ]);
    sub.on("event", (event) => {
      setNewEvent(event);
    });
  };

  //  may get all feeds on load?
  const getEvents = async () => {
    var events = await relay.list([
      {
        kinds: [1],
      },
    ]);
    setEvents(events);
  };

  //   format date for display
  function convertUnixTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <div className="bg-gray-900">
      <div className="flex justify-around items-center w-full">
        <button
          onClick={() => getEvents()}
          className="bg-transparent px-3 py-1.5 rounded-sm text-gray-800 my-5  "
        >
          load feeds
        </button>
      </div>

      <div className="flex items-center justify-center w-full ">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded overflow-hidden shadow-md p-6 w-2/3 my-10"
        >
          <div className="mb-4">
            <textarea
              id="comment"
              name="comment"
              placeholder="What is in your mind?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-indigo-500"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="flex justify-center items-center w-2/3">
        <div className="flex-col gap-3">
          <p className="text-transparent my-3">Publish status: {pubStatus}</p>
          <div className="flex justify-between gap-12">
            <button
              onClick={() => getEvent()}
              className="bg-transparent px-3 py-1.5 rounded-sm text-gray-800"
            >
              subscribe event
            </button>
            {newEvent ? (
              <p className="text-transparent my-3">
                Subscribed event content: {newEvent.content}
              </p>
            ) : (
              <p>no new event</p>
            )}{" "}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-2/3 ">
          {events !== null &&
            events.map((event) => (
              <div
                key={event.sig}
                className="bg-slate-100 border border-darkblue rounded-2xl  rounded-bl-2xl my-3 shadow-sm"
              >
                <div className="flex items-center justify-between bg-darkblue px-4 py-2 rounded-2xl rounded-b-none ">
                  <p className="text-sm text-transparent font-normal font-mono">
                    {event.pubkey}
                  </p>
                  <p className="text-sm text-transparent font-light font-mono">
                    Posted {convertUnixTimestamp(event.created_at)}
                  </p>
                </div>
                <div className="px-2 py-3 ">
                  <p className="text-sm text-verydark font-light">
                    {event.content}
                  </p>
                </div>
              </div>
            ))}{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default Main;
