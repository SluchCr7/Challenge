'use client'
import { getAllData } from "@/utils/getAllData";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const GuessContext = createContext()


const GuessContextProvider = ({ children }) => {
    const [data, setData] = useState([])
    useEffect(() => {
        getAllData({ link: "guss", setter: setData })
    }, [])
    const addGuess = (e, question, Answer) => {
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/guss`, { question, Answer })
            .then(res => {
                console.log(res.data)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <GuessContext.Provider value={{ data, addGuess }}>
            {children}
        </GuessContext.Provider>
    )
}

export default GuessContextProvider