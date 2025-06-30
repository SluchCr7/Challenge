"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import selectRandomObject from "@/utils/getUniqueObject";
import { IoMdRefresh } from "react-icons/io";
import { AuctionContext } from "@/app/Context/Games/AuctionContext";
import GameIntro from "@/app/Components/GameIntro";

const Auction = () => {
  const [numAuction, setNumAuction] = useState(0);
  const [button, setButton] = useState("");
  const [questionMode, setQuestionMode] = useState(false);
  const [teamChose, setTeamChose] = useState("");
  const [time, setTime] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [teamOneScore, setTeamOneScore] = useState(0);
  const [teamTwoScore, setTeamTwoScore] = useState(0);
  const intervalRef = useRef(null);

  const { auction } = useContext(AuctionContext);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("remainingObjectsAuction") : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...auction]);
  }, [auction]);

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetGame = () => {
    setQuestionMode(false);
    stopTimer();
    setTime(30);
    setNumAuction(0);
    setButton("");
    selectRandomObject(auction, remainingObjects, setLastSelected, setRemainingObjects, "Auction");
  };

  const handleMinus = () => {
    const newAuction = numAuction - 1;
    setNumAuction(newAuction);
    if (time >= 1 && newAuction === 0) {
      if (teamChose === "First") {
        setTeamOneScore((prev) => prev + 1);
      } else {
        setTeamTwoScore((prev) => prev + 1);
      }
      stopTimer();
      resetGame();
    }
  };

  useEffect(() => {
    if (time < 1 && numAuction > 0) {
      if (teamChose === "First") {
        setTeamTwoScore((prev) => prev + 1);
      } else {
        setTeamOneScore((prev) => prev + 1);
      }
      stopTimer();
      resetGame();
    }
  }, [time]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-900 text-white px-4 py-5">
      {lastSelected ? (
        <>
          {questionMode && (
            <div className="mb-4 text-3xl font-bold text-yellow-400">
              {isRunning ? (
                <span className="w-14 h-14 rounded-full border-4 border-yellow-500 flex items-center justify-center">
                  {time}
                </span>
              ) : (
                <button onClick={startTimer} className="btn-primary">ابدأ المؤقت</button>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-6 md:gap-16 w-full max-w-xl my-6">
            <div className="text-center">
              <p className="uppercase text-yellow-400 text-lg">الفريق الأول</p>
              <p className="text-2xl font-bold">{teamOneScore}</p>
            </div>
            <div className="text-center">
              <p className="uppercase text-yellow-400 text-lg">الفريق الثاني</p>
              <p className="text-2xl font-bold">{teamTwoScore}</p>
            </div>
          </div>

          <div className="bg-yellow-100 text-gray-800 text-center p-6 rounded-xl text-xl font-bold w-full max-w-2xl shadow-lg">
            {lastSelected?.question}
          </div>

          {questionMode ? (
            <div className="mt-8 w-full flex flex-col items-center">
              <h3 className="text-yellow-400 text-lg mb-4">{teamChose} Team</h3>
              <div className="flex w-full max-w-xs gap-4 items-center mb-6">
                <button onClick={handleMinus} className="btn-gray-500 w-1/3">-</button>
                <div className="w-2/3 text-center border-2 border-yellow-500 py-2 rounded-lg text-lg font-bold">
                  {numAuction}
                </div>
              </div>
              {(time === 0 || numAuction === 0) && (
                <button onClick={resetGame} className="text-2xl text-yellow-400">
                  <IoMdRefresh />
                </button>
              )}
            </div>
          ) : (
            <div className="mt-8 w-full flex flex-col items-center gap-6">
              <h3 className="text-yellow-400 text-lg">من الفريق الذي قام بالمزايدة الأعلى؟</h3>
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {[
                  { label: "First", text: "الفريق الأول" },
                  { label: "Second", text: "الفريق الثاني" },
                ].map((team) => (
                  <button
                    key={team.label}
                    onClick={() => setButton(team.label)}
                    className={` bg-gray-500 ${button === team.label ? "bg-yellow-500 text-white" : "text-yellow-400"} p-3 rounded-xl `}
                  >
                    {team.text}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setNumAuction(numAuction - 1)} className="btn-secondary w-12">-</button>
                <div className="text-xl font-bold text-yellow-400">{numAuction}</div>
                <button onClick={() => setNumAuction(numAuction + 1)} className="btn-secondary w-12">+</button>
              </div>
              <button
                onClick={() => {
                  setQuestionMode(true);
                  setTeamChose(button);
                }}
                className={`btn-primary mt-4 ${!button && "opacity-50 pointer-events-none"}`}
              >
                بدء اللعبة
              </button>
            </div>
          )}
        </>
      ) : (
        <GameIntro
          name="Auction"
          team={auction}
          selectRandomObject={selectRandomObject}
          remainingObjects={remainingObjects}
          setLastSelected={setLastSelected}
          setRemainingObjects={setRemainingObjects}
          text="يقوم كل فريق بالمزايدة على الفريق الآخر بعد معرفة السؤال، وإذا أجاب عن العدد المتزايد به في 30 ثانية، يحصل على نقطة"
        />
      )}
    </div>
  );
};

export default Auction;