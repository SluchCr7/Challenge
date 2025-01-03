'use client'
import { getAllData } from "@/utils/getAllData";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const ReskContext = createContext();

const ReskContextProvider = ({ children }) => {
    const [resk , setResk] = useState([])
    useEffect(() => {
        getAllData({ link: "resk", setter: setResk })
    }, [])
    const addResk = (e , name ,Easy , Medium , Hard , Expert ) => {
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/resk` , {name , Easy , Medium , Hard , Expert})
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <ReskContext.Provider value={{resk , addResk}}>
        {children}
        </ReskContext.Provider>
    );
};

export default ReskContextProvider