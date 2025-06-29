// ✅ نسخة محسّنة من لعبة بنك: تنبيه قبل الانتقال بين الجولات + تصفير بعد كل جولة + مؤثرات framer-motion
"use client"
import React, { useContext, useEffect, useRef, useState } from "react";
import { BankContext } from "@/app/Context/Games/BankContext";
import { FaCheck, FaArrowAltCircleRight, FaInfoCircle } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import selectRandomObject from "@/utils/getUniqueObject";
import GameIntro from "@/app/Components/GameIntro";
import { motion, AnimatePresence } from "framer-motion";

const Bank = () => {
  const { data } = useContext(BankContext);
  const [turn, setTurn] = useState("First");
  const [ScoreTeamOne, setScoreTeamOne] = useState(0);
  const [ScoreTeamTwo, setScoreTeamTwo] = useState(0);
  const [score, setScore] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [roundNum, setRoundNum] = useState(1);
  const [time, setTime] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [Question, setQuestion] = useState(1);
  const intervalRef = useRef(null);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showRoundAlert, setShowRoundAlert] = useState(false);

  useEffect(() => {
    // Access localStorage only on the client side
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsBank') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...data]);
  }, []);

  const rounds = ["1", "2", "3", "4", "5", "6"];

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
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  };

  const handleNext = () => {
    if (Question === 12) {
      setShowRoundAlert(true);
      return;
    }
    setQuestion((prev) => prev + 1);
    selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Bank");
  };

  const proceedToNextRound = () => {
    setShowRoundAlert(false);
    setTurn((prev) => (prev === "First" ? "Second" : "First"));
    setScore(0);
    setIncrement(1);
    setTime(120);
    setQuestion(1);
    setRoundNum((prev) => prev + 1);
    selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Bank");
  };

  const handleCorrect = () => {
    setScore((prev) => prev + increment);
    setIncrement((prev) => prev * 2);
    handleNext();
  };

  const handleWrong = () => {
    setScore(0);
    setIncrement(1);
    handleNext();
  };

  const handleBank = () => {
    if (turn === "First") setScoreTeamOne((prev) => prev + score);
    else setScoreTeamTwo((prev) => prev + score);
    setScore(0);
    setIncrement(1);
  };

  useEffect(() => {
    if (time === 0) {
      setShowRoundAlert(true);
    }
  }, [time]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-8 px-4 gap-5 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white relative">
      <button
        className="absolute top-5 right-5 text-yellow-500 text-2xl hover:text-yellow-600"
        onClick={() => setShowInstructions(true)}
      >
        <FaInfoCircle />
      </button>

      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md text-center relative shadow-xl"
            >
              <button className="absolute top-3 right-3 text-red-500 text-xl" onClick={() => setShowInstructions(false)}>
                <AiOutlineClose />
              </button>
              <h2 className="text-xl font-bold text-yellow-600 mb-4">تعليمات اللعبة</h2>
              <p className="text-gray-700 leading-relaxed">
                يتم سؤال الفريق 12 سؤال في 120 ثانية.<br />
                عند الإجابة الصحيحة يتضاعف السكور.<br />
                في حالة الخطأ يعود السكور إلى صفر.<br />
                bank يمكن تخزين السكور في أي لحظة بالضغط على زر 
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRoundAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-[90%] max-w-lg text-center shadow-xl"
            >
              <h3 className="text-xl font-bold mb-3 text-yellow-600">انتهت الجولة!</h3>
              <p className="mb-4 text-gray-700">هل تريد الانتقال للجولة التالية؟ تأكد من أنك خزنت نقاطك باستخدام زر Bank.</p>
              <button
                onClick={proceedToNextRound}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-md"
              >
                متابعة
              </button>
              <button
                onClick={() => setShowRoundAlert(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md ml-4"
              >
                الغاء
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {lastSelected ? (
        <>
 <div className="w-full max-w-5xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="border border-green-600 rounded-lg p-4">
              <p className="text-sm text-green-700">الفريق الأول</p>
              <p className="text-lg font-bold">{ScoreTeamOne}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-yellow-600 text-xl">{turn} Team</p>
              <p className="text-yellow-600 text-xl">سؤال {Question}</p>
            </div>
            <div className="border border-green-600 rounded-lg p-4">
              <p className="text-sm text-green-700">الفريق الثاني</p>
              <p className="text-lg font-bold">{ScoreTeamTwo}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {rounds.map((round, index) => (
              <div
                key={index}
                className={`rounded-md text-center p-3 border ${
                  roundNum.toString() === round ? 'bg-yellow-500 text-black font-bold' : 'border-yellow-500 text-yellow-700'
                }`}
              >
                الجولة {round}
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xl">⏱️ <span className="text-yellow-600 font-bold">{time}</span> ثانية</p>
            <div className="flex flex-wrap gap-3 justify-center mt-4">
              <button onClick={startTimer} disabled={isRunning} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">ابدأ</button>
              <button onClick={stopTimer} className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md">أوقف</button>
              <button onClick={() => setTime(120)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">إعادة</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <button onClick={handleCorrect} className="flex justify-center items-center gap-2 px-4 py-3 border border-green-600 rounded-md text-green-600 hover:bg-green-100">
              <FaCheck /> صحيحة
            </button>
            <button onClick={handleWrong} className="flex justify-center items-center gap-2 px-4 py-3 border border-red-600 rounded-md text-red-600 hover:bg-red-100">
              <AiOutlineClose /> خاطئة
            </button>
          </div>

          <div className="text-center mt-6 space-y-3">
            <p className="text-xl text-yellow-700 font-semibold">{lastSelected?.question}</p>
            <p className="text-lg text-gray-600">الإجابة: {lastSelected?.Answer}</p>
            <div className="flex gap-4 items-center justify-center">
              <span className="font-bold">النقاط: {score}</span>
              <button onClick={handleBank} className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700">Bank</button>
            </div>
          </div>
        </div>  
        </>
      ) : (
        <GameIntro name={"Bank"} team={data} selectRandomObject={selectRandomObject} remainingObjects={remainingObjects} setLastSelected={setLastSelected} setRemainingObjects={setRemainingObjects} text={"ابدأ التحدي بالضغط على الزر واكتشف أسئلتك!"}
        />
      )}
    </div>
  );
};

export default Bank;
