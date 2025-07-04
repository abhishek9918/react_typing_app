import React, { useEffect, useState } from "react";
import typingStyle from "./typing.module.css";
import { paragraphArray } from "../assets/pragraph";
import { faArrowRight, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import TimerButton from "./TimerButton";
import Result from "./Result";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Certificate from "./certificate";

function Typing() {
  const [typedText, setTypedText] = useState("");
  const [correctWords, setCorrectWords] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
  const [timeEnum, setTimeEnum] = useState("HALF");
  const [selectedTime, setSelectedTime] = useState(30);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTyping, setTyping] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isTestOver, setIsTestOver] = useState(false);
  const [isValidTest, setIsValidTest] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setaccuracy] = useState(0);
  const [typoError, setTypoError] = useState(0);
  const [paraIndex, setParaIndex] = useState("");
  const times = [
    {
      time: 1,
      enum: "ONE",
    },
    {
      time: 30,
      enum: "HALF",
    },
    { time: 60, enum: "FULL" },
    { time: 120, enum: "DOUBLE" },
  ];
  const difficulties = ["Easy", "Medium", "Hard"];
  const [para, setPara] = useState([]);
  function difficultiesLevel(level, indexPara) {
    setSelectedDifficulty(level);
    setParaIndex(indexPara);
  }
  function resetTyping() {
    const typingStarted = typedText.length > 0;
    setTyping(typingStarted);
    if (typingStarted && !isRunning && timeLeft > 0) {
      setIsRunning(true);
    }
  }
  useEffect(() => {
    resetTyping();
  }, [typedText]);
  useEffect(() => {
    const minimumWordsRequired = 10;
    const typedWords = typedText
      .trim()
      .split(" ")
      .filter((word) => word !== "");
    const totalTyped = typedWords.length;
    const randomPara = paragraphArray[paraIndex]?.text.split(" ");
    const correctWords = typedWords.filter(
      (word, index) => word === randomPara[index]
    );
    setCorrectWords(correctWords);
    const isValid = correctWords.length >= minimumWordsRequired;
    setIsValidTest(isValid);
    if (isValid) {
      const error = typedWords.filter(
        (word, index) => word !== randomPara[index]
      );
      setTypoError(error.length);
      const accuracy =
        totalTyped > 0 ? (correctWords.length / totalTyped) * 100 : 0;
      setaccuracy(accuracy);
    }
  }, [typedText, paraIndex]);
  useEffect(() => {
    const wpm = (correctWords.length / selectedTime) * 60;
    setWpm(wpm);
  }, [correctWords, selectedTime]);
  useEffect(() => {
    if (selectedDifficulty) {
      const filteredParas = paragraphArray.filter(
        (para) =>
          para.category.toLowerCase() === selectedDifficulty.toLowerCase()
      );
      const randomIndex = Math.floor(Math.random() * filteredParas.length);
      const randomParagraph = filteredParas[randomIndex].text.split("");
      setParaIndex(randomIndex);
      setTypedText("");
      setIsRunning(false);
      setTyping(false);
      setTimeLeft(selectedTime);
      setPara(randomParagraph);
    }
  }, [selectedDifficulty]);
  useEffect(() => {
    if (timeLeft == 0) {
      setIsTestOver(true);
      setIsRunning(false);
      setTyping(false);
    }
  }, [timeLeft]);
  function setTimer(timeObj) {
    setSelectedTime(timeObj.time);
    setTimeLeft(timeObj.time);
    setTimeEnum(timeObj.enum);
    setTypedText("");
    setIsRunning(false);
    setTyping(false);
  }
  useEffect(() => {
    if (!isRunning || timeLeft <= 0 || !isTyping) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isTyping]);
  function onRetry() {
    setIsTestOver(false);
    resetTyping();
    setTypedText("");
    setIsRunning(false);
    setTyping(false);
    setTimeLeft(selectedTime);
  }
  function onCorrectKeyPressed() {
    const keyEffectUrl = new Audio(
      "/mixkit-hard-single-key-press-in-a-laptop-2542.wav"
    );

    keyEffectUrl.currentTime = 0;
    keyEffectUrl.play();
  }
  function onWrongKeyPressed() {
    const keyEffectUrl = new Audio(
      "/mixkit-game-show-wrong-answer-buzz-950.wav"
    );
    keyEffectUrl.currentTime = 0;
    keyEffectUrl.play();
  }
  function checkKeyPress(event) {
    const key = event.key;

    if (key.length > 1 && key !== "Backspace" && key !== " ") return;

    const currentIndex = typedText.length;
    const expectedChar = para[currentIndex];

    if (key === expectedChar) {
      onCorrectKeyPressed();
    } else {
      onWrongKeyPressed();
    }
  }

  async function generateCertificate() {
    const element = document.getElementById("certificate");

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const userName = "Ravi";
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${userName || "typing"}-certificate.pdf`);
  }
  return (
    <>
      {isTestOver ? (
        <Result
          onRetry={onRetry}
          wpm={isValidTest ? wpm : 0}
          accuracy={isValidTest ? accuracy : 0}
          typoError={isValidTest ? typoError : 0}
          time={selectedTime}
        />
      ) : (
        <div className={typingStyle["container"]}>
          <header className="flex flex-col sm:flex-row justify-between items-center px-8 py-5 rounded-xl bg-black/40 backdrop-blur-md shadow-lg shadow-black/30 text-white select-none transition-all duration-300 ease-in-out">
            <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)] mb-3 sm:mb-0">
              Typing Speed Test
            </h1>
            <span className="text-2xl font-bold tracking-widest font-mono">
              {timeLeft}s
            </span>

            <p>Is Typing: {isTyping ? "Yes" : "No"}</p>
            <div className="flex items-center space-x-3 font-semibold text-lg bg-white/10 border border-white/10 rounded-lg px-4 py-1 shadow-md backdrop-blur-sm">
              <FontAwesomeIcon icon={faClock} className="text-xl" />
              <span className="border-r-2 px-3"> Time</span>
              <span className="text-2xl font-bold tracking-widest font-mono">
                {times.map((time, index) => {
                  return (
                    <div key={index} className="inline-block">
                      <TimerButton
                        time={time}
                        index={index}
                        setTimer={setTimer}
                        timeEnum={timeEnum}
                      />
                    </div>
                  );
                })}
              </span>
            </div>
          </header>
          <section className="flex justify-center my-6 space-x-4">
            {difficulties.map((level, index) => {
              const isSelected = selectedDifficulty === level;
              return (
                <button
                  key={index}
                  onClick={() => difficultiesLevel(level, index)}
                  className={`
                px-6 py-2 rounded-lg text-lg transition-all duration-300 focus:outline-none border font-semibold
                ${
                  isSelected
                    ? "bg-green-800 text-white shadow-lg"
                    : "bg-transparent text-black border-black"
                }
                hover:bg-green-600 hover:text-white hover:shadow-md transform hover:scale-105
              `}
                >
                  {level}
                </button>
              );
            })}
          </section>
          <section className={typingStyle["typing-area"]}>
            {para.map((char, index) => {
              const typedChar = typedText[index];
              let className = "";
              if (typedChar == null) {
                className = typingStyle["default-char"];
              } else if (typedChar == char) {
                className = typingStyle["correct-char"];
              } else {
                className = typingStyle["wrong-char"];
              }
              return (
                <span
                  key={index}
                  className={`${typingStyle["text-to-type"]} ${className}`}
                >
                  {char}
                </span>
              );
            })}
            <textarea
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              onKeyDown={checkKeyPress}
              placeholder="Start typing here..."
              rows={5}
            ></textarea>
          </section>
          <section className={typingStyle["controls"]}>
            <button disabled>Start Test</button>
          </section>
        </div>
      )}
    </>
  );
}
export default Typing;
