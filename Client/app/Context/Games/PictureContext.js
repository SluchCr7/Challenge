'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { getAllData } from "@/utils/getAllData";

export const PictureContext = createContext();

const PictureContextProvider = ({ children }) => {
    const [team , setTeam] = useState([])
    useEffect(() => {
        getAllData({ link: "teams", setter: setTeam })
    }, [])
    const addTeam = (image , name , teamMempers) => {
        const formData = new FormData()
        formData.append('image', image)
        formData.append('Name', name)
        for (let i = 0; i < teamMempers.length; i++) {
            formData.append('TeamMembers', teamMempers[i])
        }

        axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/teams`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <PictureContext.Provider value={{team , addTeam}}>
        {children}
        </PictureContext.Provider>
    );
};

export default PictureContextProvider