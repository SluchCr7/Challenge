"use client"
import { getAllData } from "@/utils/getAllData";
import axios from "axios";
import { createContext } from "react";
import { useEffect , useState } from "react";
export const ClubsContext = createContext()


export const ClubsContextProvider = ({children}) => {
    const [data , setData] = useState([])
    useEffect(() => {
        getAllData({ link: "clubs", setter: setData })
    }, [])
    const addNewPlayerClubs = (e,name, clubs) => {
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/clubs`, name, clubs)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const deleteClubs = (id) => {
        axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/clubs/${id}`)
            .then((res) => {
                console.log(res);
                setData(prev => prev.filter(item => item._id !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <ClubsContext.Provider value={{data , addNewPlayerClubs , deleteClubs}}>
            {children}
        </ClubsContext.Provider>
    )
}