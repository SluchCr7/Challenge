'use client'
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { getAllData } from "@/utils/getAllData";

export const RoundContext = createContext()
const RoundContextProvider = ({ children }) => {
    const [data , setData] = useState([])
    useEffect(() => {
        getAllData({ link: 'round', setter: setData })
    }, [])
    const addRound = (e , question , examples) => {
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/round` , {question , examples})
            .then(res => {
                console.log(res.data)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <RoundContext.Provider value={{ data  , addRound}}>
            {children}
        </RoundContext.Provider>
    )
}

export default RoundContextProvider