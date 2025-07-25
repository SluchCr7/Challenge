'use client';
import axios from "axios";
import React, { useEffect, useState, createContext, useContext } from "react";

export const TopTenContext = createContext();

export const TopTenContextProvider = ({ children }) => {
  const [topTenData, setTopTenData] = useState([]);

  // ✅ جلب الداتا بشكل مخصص
  useEffect(() => {
    const fetchTopTenData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/topten`);
        
        // تحقق أن الاستجابة تحتوي على questions كمصفوفة
        if (res.data?.questions && Array.isArray(res.data.questions)) {
          setTopTenData(res.data.questions);
        } else {
          console.warn("Unexpected response structure:", res.data);
          setTopTenData([]);
        }
      } catch (error) {
        console.error("Error fetching TopTen data:", error);
      }
    };

    fetchTopTenData();
  }, []);

  const addTopTen = (e, title, questions) => {
    e.preventDefault();
    axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/topten`, { title, questions })
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
