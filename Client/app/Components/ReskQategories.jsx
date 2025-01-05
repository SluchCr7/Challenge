import React from 'react';
const DifficultyButton = ({ id, difficulty, questionData, setQategory, values, randomDouble, setValues }) => {
  const isDisabled = values.find((question) => question === questionData.question);
  const handleClick = () => {
    setQategory(questionData);
    setValues([...values, questionData.question]);
  };

  const buttonClasses = `
    border-[1px] ${isDisabled ? "pointer-events-none bg-yellow-600 text-black" : "text-yellow-600"}
    hover:bg-yellow-600 hover:text-black transition-all duration-500
    p-3 rounded-md w-[100%] h-[60px] flex items-center justify-center
    ${randomDouble == id}? "border-green-700" : "border-yellow-700"
  `;

  return (
    <span id={id} onClick={handleClick} className={buttonClasses}>
      {questionData.value}
    </span>
  );
};


const CategoryCard = ({ category, index, setQategory, values, randomDouble, setValues }) => {
  const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'];

  return (
    <div className="flex items-center mx-auto flex-col gap-4 w-[80%] md:w-[400px]">
      <span className="text-white text-xl font-bold border-[1px] border-white text-center p-5 rounded-md w-full">
        {category.name}
      </span>
      <div className="resk grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
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

export const CategoriesGrid = ({ randomReskCategories, setQategory, values, randomDouble, setValues }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
      {randomReskCategories.map((category, index) => (
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

