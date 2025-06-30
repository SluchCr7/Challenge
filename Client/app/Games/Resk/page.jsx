"use client";
import React, { useContext, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { ReskContext } from "@/app/Context/Games/ReskContext";
import getRandomObjects from "@/utils/getRandomObjects";
import { CategoriesGrid } from "@/app/Components/ReskQategories";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Resk = () => {
  const [show, setShow] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [qategory, setQategory] = useState({ question: null, answer: null, value: 0 });
  const [randomReskCategories, setRandomReskCategories] = useState([]);
  const [valueTeamOne, setValueTeamOne] = useState(0);
  const [valueTeamTwo, setValueTeamTwo] = useState(0);
  const [turn, setTurn] = useState("First");
  const [values, setValues] = useState([]);
  const [randomDouble, setRandomDouble] = useState(0);
  const { resk } = useContext(ReskContext);
  const Numbers = [5, 10, 20, 40];
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  
  const randomNumber = () => {
    const randomNum = Math.floor(Math.random() * 16) + 1;
    setRandomDouble(randomNum);
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
  
    return () => clearInterval(timerRef.current);
  }, [isRunning]);
  

  const randomData = () => {
    const random = getRandomObjects(resk);
    setRandomReskCategories(random);
    randomNumber();
    setValues([]);
    setValueTeamOne(0);
    setValueTeamTwo(0);
    setTurn("First");
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen  py-10 px-4 text-white relative">
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="text-yellow-400 hover:text-yellow-300 text-2xl"
        >
          <IoMdInformationCircleOutline />
        </button>
      </div>
      <AnimatePresence>
        {qategory.question && (
          // <div className="Result w-full mx-auto relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-[40%] -translate-x-1/2 -translate-y-1/2 bg-[#1f2a1f] p-8 rounded-xl shadow-2xl border-2 border-yellow-500 w-[90%] mx-auto md:w-[60%] z-50"
            >
              <div className="text-center space-y-4">
                <h3 className="text-3xl text-yellow-400 font-bold">{qategory.value} نقطة</h3>
                <p className="text-xl font-medium text-white">{qategory.question}</p>
                <p className="text-md text-green-400">{qategory.answer}</p>
                <div className="flex justify-center gap-6 mt-4">
                  <button
                    onClick={() => {
                      setTurn(turn === "First" ? "Second" : "First");
                      const val = qategory.value;
                      setQategory({ question: null, answer: null, value: 0 });
                      setValueTeamOne(turn === "First" ? valueTeamOne + val : valueTeamOne);
                      setValueTeamTwo(turn === "Second" ? valueTeamTwo + val : valueTeamTwo);
                    }}
                    className="w-10 h-10 flex items-center justify-center bg-green-600 rounded-full"
                  >
                    <FaCheck color="white" />
                  </button>
                  <button
                    onClick={() => {
                      setQategory({ question: null, answer: null, value: 0 });
                      setTurn(turn === "First" ? "Second" : "First");
                    }}
                    className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full"
                  >
                    <AiOutlineClose color="white" />
                  </button>
                </div>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 right-6 bg-[#1a1d1a] border border-yellow-500 p-4 rounded-xl shadow-xl w-[300px] text-sm z-50"
          >
            <ul className="text-yellow-400 space-y-2">
              <li>🟩 السؤال ذو الحواف الخضراء هو الدابل</li>
              <li>✅ الإجابة الصحيحة = النقاط الكاملة</li>
              <li>❌ الخطأ = لا نقاط</li>
              <li>🕹️ السؤال لا يُعاد فتحه بعد إغلاقه</li>
              <li>🛠️ يمكن تعديل النقاط يدويًا</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-6xl">
        {show ? (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#1f2a1f] p-4 rounded-xl shadow border border-yellow-500 mb-6">
    <div className="text-yellow-400 text-xl font-bold">⏱️ {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}</div>
    <div className="flex gap-4 mt-2 md:mt-0">
      <button
        onClick={() => setIsRunning(true)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-bold transition"
      >
        Start
      </button>
      <button
        onClick={() => setIsRunning(false)}
        className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-xl font-bold transition"
      >
        Pause
      </button>
      <button
        onClick={() => {
          setTime(0);
          setIsRunning(false);
        }}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-bold transition"
      >
        Reset
      </button>
    </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {["الفريق الاول", "الفريق الثاني"].map((label, i) => (
                <div key={i} className="bg-[#1f2a1f] p-6 rounded-2xl shadow border border-green-600 flex flex-col gap-4">
                  <h2 className="text-center text-xl font-bold text-green-400">{label}</h2>
                  <p className="text-center text-lg">Value: {i === 0 ? valueTeamOne : valueTeamTwo}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {Numbers.map((n) => (
                      <button
                        key={n}
                        onClick={() => i === 0 ? setValueTeamOne(valueTeamOne + n) : setValueTeamTwo(valueTeamTwo + n)}
                        className="bg-gray-800 text-white rounded-lg p-2 font-bold hover:bg-green-600 hover:text-white transition"
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <CategoriesGrid
              randomReskCategories={randomReskCategories}
              setQategory={setQategory}
              values={values}
              randomDouble={randomDouble}
              setValues={setValues}
            />

            <button
              className="w-full md:w-[200px] mx-auto bg-yellow-500 hover:bg-yellow-600 text-black p-4 rounded-xl font-bold transition"
              onClick={randomData}
            >
              Next Game
            </button>


          </motion.div>
        ) : (
          <div className="text-center space-y-6">
            <button
              onClick={() => {
                setShow(true);
                randomData();
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black p-4 rounded-xl font-bold transition"
            >
              Start Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resk;
