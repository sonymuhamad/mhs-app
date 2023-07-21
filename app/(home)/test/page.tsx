"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import io from "socket.io-client";

type Data = {
  rfid: string;
};

const StartListeningButton = () => {
  const [readyToTap, setReadyToTap] = useState(false);
  const [rfid, setRfid] = useState("");
  const socket = io("http://localhost:3001");
  socket.on("read-rfid", (data) => {
    const rfidData: Data = JSON.parse(data);
    setRfid(rfidData.rfid);
  });

  const handleTap = () => {
    setReadyToTap((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        className={clsx(
          "w-64 h-64 rounded-full hover:text-2xl bg-zinc-500 text-white text-xl font-bold flex items-center justify-center cursor-pointer  border-8 border-zinc-700 p-8",
          readyToTap &&
            "w-64 h-64 rounded-full bg-neutral-300 text-white text-xl font-bold flex items-center justify-center  animate-pulse border-8 border-gray-500 p-8"
        )}
        onClick={handleTap}
      >
        {readyToTap ? "Waiting for RFID" : "Start Tap"}
      </button>

      <div>
        {rfid === "" && !readyToTap ? (
          <span>RFID NOT FOUND</span>
        ) : (
          <span>{rfid}</span>
        )}
      </div>
    </div>
  );
};

export default StartListeningButton;
