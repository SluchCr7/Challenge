import React from 'react';
import { motion } from 'framer-motion';
import { RiCopperCoinLine, RiFocus2Line, RiFireLine, RiTrophyLine } from 'react-icons/ri';

const DifficultyButton = ({ id, difficulty, questionData, setQategory, values, randomDouble, setValues }) => {
  const isDisabled = values.find((question) => question === questionData?.question);
  const isDouble = randomDouble == id;

  const handleClick = () => {
    if (questionData) {
      setQategory(questionData);
      setValues([...values, questionData.question]);
    }
  };

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      onClick={handleClick}
      disabled={isDisabled}
      className={`
        relative overflow-hidden group h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 border
        ${isDisabled
          ? "bg-white/5 border-white/5 text-white/20 cursor-not-allowed opacity-50"
          : isDouble
            ? "glass-dark border-primary/50 text-primary shadow-[0_0_15px_rgba(225,6,0,0.2)]"
            : "glass border-white/10 text-white hover:border-primary/50"}
      `}
    >
      {isDouble && !isDisabled && (
        <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-pulse" />
      )}
      <span className={`text-xl font-black italic tracking-tighter ${isDisabled ? '' : 'group-hover:text-primary transition-colors'}`}>
        {questionData?.value || 0}
      </span>
      <span className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-40">
        {difficulty}
      </span>
    </motion.button>
  );
};

const CategoryCard = ({ category, index, setQategory, values, randomDouble, setValues }) => {
  const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'];

  const icons = [
    <RiFocus2Line key="1" />,
    <RiFireLine key="2" />,
    <RiTrophyLine key="3" />,
    <RiCopperCoinLine key="4" />
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col gap-6 w-full"
    >
      <div className="relative group">
        <div className="absolute inset-x-0 -bottom-2 h-4 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="glass-dark border border-white/10 p-6 rounded-[2rem] flex items-center justify-between group-hover:border-primary/30 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl">
              {icons[index % 4]}
            </div>
            <h3 className="text-xl font-black italic text-white tracking-tighter uppercase">
              {category.name}
            </h3>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-primary/50" />)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full">
        {difficulties.map((difficulty, i) => (
          <DifficultyButton
            key={`${index}-${i}`}
            id={`${index * 4 + i + 1}`}
            difficulty={difficulty}
            questionData={category[difficulty]}
            setQategory={setQategory}
            values={values}
            randomDouble={randomDouble}
            setValues={setValues}
          />
        ))}
      </div>
    </motion.div>
  );
};

export const CategoriesGrid = ({ randomRiskCategories, setQategory, values, randomDouble, setValues }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 w-full max-w-6xl mx-auto py-12">
      {randomRiskCategories.map((category, index) => (
        <CategoryCard
          key={index}
          category={category}
          index={index}
          setQategory={setQategory}
          values={values}
          randomDouble={randomDouble}
          setValues={setValues}
        />
      ))}
    </div>
  );
};
