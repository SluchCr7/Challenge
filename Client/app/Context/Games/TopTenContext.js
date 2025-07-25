'use client';
import { getAllData } from "@/utils/getAllData";
import axios from "axios";
import React, { useEffect, useState, createContext, useContext } from "react";

export const TopTenContext = createContext();

export const TopTenContextProvider = ({ children }) => {
  const [topTenData, setTopTenData] = useState([]);

  useEffect(() => {
    getAllData({ link: "topten", setter: setTopTenData });
  }, []);

  const addTopTen = (e, title, questions) => {
    e.preventDefault();
    const fullData = { title, questions };
    axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/topten`, {title, questions})
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
