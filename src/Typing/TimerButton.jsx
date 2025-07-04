import React, { useEffect, useState } from "react";

function TimerButton({ time, index, setTimer, timeEnum }) {
  const isSelected = timeEnum === time.enum;
  return (
    <>
      <button
        key={index}
        onClick={(e) => setTimer(time)}
        className={`hover:bg-black/70 rounded-md p-2 inline-block duration-300 focus:outline-none mx-1 border ${
          isSelected ? "transform hover:scale-105 bg-black" : ""
        }`}
      >
        {time.time}
      </button>
    </>
  );
}

export default TimerButton;
