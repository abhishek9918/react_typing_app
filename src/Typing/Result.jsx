import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";

import { faLock } from "@fortawesome/free-solid-svg-icons";
import Certificate from "./certificate";

function Result({ wpm, accuracy, typoError, time, onRetry, onShare }) {
  const [userName, setUserName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setUserName("");
  }
  return (
    <>
      <div className="hidden">
        <Certificate
          className="hidden"
          // generateCertificate={generateCertificate}
          // wpm={isValidTest ? wpm : 0}
          // accuracy={isValidTest ? accuracy : 0}
          // typoError={isValidTest ? typoError : 0}
          // time={selectedTime}
        />
      </div>
      <div className="fixed inset-0 transBg   flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-4">
            Enter a name that you want to show on you result!!
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 mt-10 text-center transition-transform transform hover:scale-105">
        <h2 className="text-4xl font-extrabold text-indigo-600 mb-6">
          Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-indigo-50 rounded-lg p-6 shadow-md transition-transform transform hover:scale-105">
            <p className="text-sm font-semibold text-indigo-500">Speed</p>
            <p className="text-5xl font-bold text-indigo-700 mt-2">
              {wpm}
              <span className="text-lg font-medium text-indigo-400">WPM</span>
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-6 shadow-md transition-transform transform hover:scale-105">
            <p className="text-sm font-semibold text-green-500">Accuracy</p>
            <p className="text-5xl font-bold text-green-700 mt-2">
              {accuracy.toFixed(2)}%
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-6 shadow-md transition-transform transform hover:scale-105">
            <p className="text-sm font-semibold text-red-500">Errors</p>
            <p className="text-5xl font-bold text-red-700 mt-2">{typoError}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-6 shadow-md transition-transform transform hover:scale-105">
            <p className="text-sm font-semibold text-yellow-500">Time</p>
            <p className="text-5xl font-bold text-yellow-700 mt-2">{time}s</p>
          </div>
        </div>
        <div className="flex justify-center space-x-6">
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 transform hover:scale-105"
          >
            Retry
          </button>
          <button
            onClick={onShare}
            className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-100 transition duration-200 transform hover:scale-105 "
          >
            Certificate
            <FontAwesomeIcon icon={faLock} className="pl-2" />
            <FontAwesomeIcon icon={faLockOpen} className="pl-2" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Result;
