'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { getAllData } from "@/utils/getAllData";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
    const [player , setPlayer] = useState([])
    useEffect(() => {
        getAllData({ link: "questions", setter: setPlayer })
    }, [])
    const addPlayerClos = (Name, Clos) => {
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/questions`, { Name, Clos })
            .then(res => {
                console.log(res.data)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <PlayerContext.Provider value={{player , addPlayerClos}}>
        {children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider