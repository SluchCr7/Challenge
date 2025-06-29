"use client";
import React, { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { ReskContext } from "@/app/Context/Games/ReskContext";
import getRandomObjects from "@/utils/getRandomObjects";
import { CategoriesGrid } from "@/app/Components/ReskQategories";
import { motion, AnimatePresence } from "framer-motion";

const Resk = () => {
  const [show, setShow] = useState(false);
  const [qategory, setQategory] = useState({ question: null, answer: null, value: 0 });
  const [randomReskCategories, setRandomReskCategories] = useState([]);
  const [valueTeamOne, setValueTeamOne] = useState(0);
  const [valueTeamTwo, setValueTeamTwo] = useState(0);
  const [turn, setTurn] = useState("First");
  const [values, setValues] = useState([]);
  const [randomDouble, setRandomDouble] = useState(0);
  const { resk } = useContext(ReskContext);
  const Numbers = [5, 10, 20, 40];

  const randomNumber = () => {
    const randomNum = Math.floor(Math.random() * 16) + 1;
    setRandomDouble(randomNum);
  };

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
    <div className="flex items-center justify-center w-full min-h-screen bg-[#0d0f14] py-10 px-4 text-white">
      <div className="w-full max-w-6xl">
        {show ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {["الفريق الاول", "الفريق الثاني"].map((label, i) => (
                <div key={i} className="bg-[#1a1d24] p-6 rounded-2xl shadow border border-yellow-500 flex flex-col gap-4">
                  <h2 className="text-center text-xl font-bold text-yellow-500">{label}</h2>
                  <p className="text-center text-lg">Value: {i === 0 ? valueTeamOne : valueTeamTwo}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {Numbers.map((n) => (
                      <button
                        key={n}
                        onClick={() => i === 0 ? setValueTeamOne(valueTeamOne + n) : setValueTeamTwo(valueTeamTwo + n)}
                        className="bg-white text-black rounded-lg p-2 font-bold hover:bg-yellow-500 hover:text-white transition"
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

            <AnimatePresence>
              {qategory.question && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a1d24] p-8 rounded-xl shadow-xl border border-yellow-600 w-[90%] max-w-md z-50"
                >
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl text-yellow-500 font-bold">{qategory.value} نقطة</h3>
                    <p className="text-xl">{qategory.question}</p>
                    <p className="text-md text-yellow-400">{qategory.answer}</p>
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
          </motion.div>
        ) : (
          <div className="text-center space-y-6">
            <p className="text-yellow-400 text-lg">
              هناك 4 مواضيع من الأسئلة وكل موضوع يحتوي على 4 أسئلة متدرجة الصعوبة من 5 إلى 40 نقطة، وهناك سؤال دابل تتضاعف نقاطه
            </p>
            <button
              onClick={() => {
                setShow(true);
                randomData();
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black p-4 rounded-xl font-bold transition"
            >
              Start Game
            </button>
            <ul className="text-yellow-400 text-right space-y-1 mt-6">
              <li>🟩 المربع ذو الحواف الخضراء هو السؤال الدابل</li>
              <li>✅ الإجابة الصحيحة تحتسب النقاط كاملة</li>
              <li>❌ الخطأ لا تحتسب أي نقاط</li>
              <li>🕹️ بعد فتح السؤال لا يمكنك فتحه مجددًا</li>
              <li>🛠️ يمكن إضافة نقاط يدويًا حسب الحاجة</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resk;
