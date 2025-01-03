'use client'
import { useState, createContext ,useEffect } from "react";
export const AuctionContext = createContext()
import axios from "axios";
import { getAllData } from "@/utils/getAllData";

const AuctionContextProvider = ({ children }) => {
    const [auction, setAuction] = useState([])
    useEffect(() => {
        getAllData({ link: "auction", setter: setAuction })
    },[])
    const addAuction = (e , question) => {
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auction`, { question })
            .then(res => {
                console.log(res.data)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <AuctionContext.Provider value={{ auction , addAuction}}>
            {children}
        </AuctionContext.Provider>
    )
}


export default AuctionContextProvider