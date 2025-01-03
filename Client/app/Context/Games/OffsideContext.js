'use client'
import { createContext, useEffect, useState } from "react";
export const OffsideContext = createContext();
import axios from "axios";
import { getAllData } from "@/utils/getAllData";

const OffsideContextProvider = ({ children }) => {
    const [data , setData] = useState([])
    useEffect(() => {
        getAllData({ link: "offside", setter: setData })
    }, [])
    const addOffside = (Clo) => {
        axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/offside` , {Clo}).then((res) => {
            console.log(res.data)
            window.location.reload()
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <OffsideContext.Provider value={{data , addOffside}}>
            {children}
        </OffsideContext.Provider>
    )
}

export default OffsideContextProvider