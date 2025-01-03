'use client'
import { getAllData } from "@/utils/getAllData";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const GussContext = createContext()


const GussContextProvider = ({ children }) => {
    const [data , setData] = useState([])
    useEffect(() => {
        getAllData({ link: "guss", setter: setData })
    }, [])
    const addGuss = (e , question , Answer) => { 
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/guss` , {question , Answer})
            .then(res => {
                console.log(res.data)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <GussContext.Provider value={{data , addGuss}}>
            {children}
        </GussContext.Provider>
    )
}

export default GussContextProvider