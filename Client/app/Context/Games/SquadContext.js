'use client'
import { getAllData } from "@/utils/getAllData";
import axios from "axios";
import React, { useEffect, useState, createContext , useContext } from "react";

export const SquadContext = createContext();

export const SquadContextProvider = ({ children }) => {
  const [squads, setSquads] = useState([]);

  useEffect(() => {
    getAllData({ link: "squad", setter: setSquads });
  }, []);

  const addSquad = (e, title , teamOne, teamTwo) => {
    e.preventDefault();
    axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/squad`, {
      title: title,
      TeamOne: teamOne,
      TeamTwo: teamTwo,
    })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteSquad = (id) => {
    axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/squad/${id}`)
      .then((res) => {
        console.log(res);
        setSquads(prev => prev.filter(item => item._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SquadContext.Provider value={{ squads, addSquad, deleteSquad }}>
      {children}
    </SquadContext.Provider>
  );
};

export const useSquadContext = () => useContext(SquadContext);
