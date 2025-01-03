'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { getAllData } from "@/utils/getAllData";

export const PassContext = createContext();

const PassContextProvider = ({ children }) => {
    const [pass , setPass] = useState([])
    useEffect(() => {
        getAllData({ link: "password", setter: setPass })
    },[])
    const addPlayer = (image, name, e ) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', name)
        axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/password` , formData)
            .then(res => {
                console.log(res.data)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <PassContext.Provider value={{pass , addPlayer}}>
            {children}
        </PassContext.Provider>
    );
};

export default PassContextProvider