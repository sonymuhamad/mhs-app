"use client";

import { useState } from "react";
import clsx from "clsx";

const StartListeningButton = () => {
  const [readyToTap, setReadyToTap] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className={clsx(
          "w-64 h-64 rounded-full hover:text-2xl bg-zinc-500 text-white text-xl font-bold flex items-center justify-center cursor-pointer  border-8 border-zinc-700 p-8",
          readyToTap &&
            "w-64 h-64 rounded-full bg-neutral-300 text-white text-xl font-bold flex items-center justify-center  animate-pulse border-8 border-gray-500 p-8"
        )}
        onClick={() => {
          setReadyToTap((prev) => !prev);
        }}
      >
        {readyToTap ? "Waiting for RFID" : "Start Tap"}
      </button>
    </div>
  );
};

export default StartListeningButton;
