'use client'
import { getAllData } from "@/utils/getAllData";
import axios from "axios";
import React, { useEffect, useState, createContext } from "react";

export const TopTenContext = createContext();

export const TopTenContextProvider = ({ children }) => {
  const [topTenData, setTopTenData] = useState([]);

  useEffect(() => {
    getAllData({ link: "topten", setter: setTopTenData });
  }, []);

const addTopTen = (e, title, topTenObject) => {
  e.preventDefault();
  const fullData = {
    title,
    question1: topTenObject.Question1,
    question2: topTenObject.Question2,
    question3: topTenObject.Question3,
    question4: topTenObject.Question4,
    question5: topTenObject.Question5,
    question6: topTenObject.Question6,
    question7: topTenObject.Question7,
    question8: topTenObject.Question8,
    question9: topTenObject.Question9,
    question10: topTenObject.Question10,
    question11: topTenObject.Question11,
    question12: topTenObject.Question12,
    question13: topTenObject.QuestionTherteen, // انتبه للمفتاح هنا
  };

  axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/topten`, fullData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};


  const deleteTopTen = (id) => {
    axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/topten/${id}`)
      .then((res) => {
        console.log(res);
        setTopTenData(prev => prev.filter(item => item._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <TopTenContext.Provider value={{ topTenData, addTopTen, deleteTopTen }}>
      {children}
    </TopTenContext.Provider>
  );
};

export const useTopTenContext = () => useContext(TopTenContext);