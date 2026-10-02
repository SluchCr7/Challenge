import React from 'react';
import { motion } from 'framer-motion';
import { RiCopperCoinLine, RiFocus2Line, RiFireLine, RiTrophyLine } from 'react-icons/ri';

const DifficultyButton = ({ id, difficulty, questionData, setQategory, values, randomDouble, setValues }) => {
  const isDisabled = Array.isArray(values) && values.includes(questionData?.question);
  const isDouble = Number(randomDouble) === Number(id);

  const baseValue = typeof questionData?.value === 'number'
    ? questionData.value
    : (difficulty === 'Easy' ? 5 : difficulty === 'Medium' ? 10 : difficulty === 'Hard' ? 20 : 40);

  const handleClick = () => {
    if (questionData) {
      const finalValue = isDouble ? baseValue * 2 : baseValue;
      setQategory({ ...questionData, value: finalValue });
      setValues((prev) => [...prev, questionData.question]);
    }
  };

  const difficultyColors = {
    Easy: "group-hover:text-emerald-400 group-hover:border-emerald-500/40",
    Medium: "group-hover:text-sky-400 group-hover:border-sky-500/40",
    Hard: "group-hover:text-amber-400 group-hover:border-amber-500/40",
    Expert: "group-hover:text-primary group-hover:border-primary/50",
  };

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.03, y: -1 } : {}}
      whileTap={!isDisabled ? { scale: 0.97 } : {}}
      onClick={handleClick}
      disabled={isDisabled}
      className={`
        relative overflow-hidden group h-20 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-150 border
        ${isDisabled
          ? "bg-slate-900/40 border-white/5 text-slate-600 cursor-not-allowed opacity-40"
          : isDouble
            ? "bg-surface-subtle border-primary text-primary shadow-[0_0_15px_rgba(0,229,153,0.25)] ring-1 ring-primary/40"
            : `bg-surface-card border-white/10 text-white ${difficultyColors[difficulty] || "hover:border-primary/40"}`}
      `}
    >
      {isDouble && !isDisabled && (
        <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-pulse" />
      )}
      <span className={`text-xl font-black italic tracking-tight ${isDisabled ? '' : 'group-hover:scale-105 transition-transform'}`}>
        {baseValue}
      </span>
      <span className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-50">
        {difficulty} {isDouble && !isDisabled ? '(2X)' : ''}
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
    <div className="flex flex-col gap-4 w-full">
      <div className="card-surface border border-white/10 p-5 rounded-2xl flex items-center justify-between transition-colors hover:border-primary/30">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-primary/20 flex items-center justify-center text-primary text-xl shadow-sm">
            {icons[index % 4]}
          </div>
          <h3 className="text-lg font-black italic text-white tracking-tight uppercase">
            {category.name}
          </h3>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/40" />)}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full">
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
    </div>
  );
};

export const CategoriesGrid = ({
  randomRiskCategories,
  randomReskCategories,
  setQategory,
  values,
  randomDouble,
  setValues
}) => {
  const categories = Array.isArray(randomRiskCategories) && randomRiskCategories.length > 0
    ? randomRiskCategories
    : (Array.isArray(randomReskCategories) ? randomReskCategories : []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 w-full max-w-6xl mx-auto py-12">
      {categories.map((category, index) => (
        <CategoryCard
          key={category._id || index}
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