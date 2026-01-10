'use client'
import { getAllData } from "@/utils/getAllData";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const RiskContext = createContext();

const RiskContextProvider = ({ children }) => {
    const [risk, setRisk] = useState([])
    useEffect(() => {
        getAllData({ link: "resk", setter: setRisk })
    }, [])
    const addRisk = (e, name, Easy, Medium, Hard, Expert) => {
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/resk`, { name, Easy, Medium, Hard, Expert })
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <RiskContext.Provider value={{ risk, addRisk }}>
            {children}
        </RiskContext.Provider>
    );
};

export default RiskContextProvider