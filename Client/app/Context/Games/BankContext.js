"use client"
import { getAllData } from "@/utils/getAllData";
import axios from "axios";
import { createContext } from "react";
import { useEffect , useState } from "react";
export const BankContext = createContext()


const BankContextProvider = ({ children }) => {
    const [data , setData] = useState([])
    useEffect(() => {
        getAllData({ link: "bank", setter: setData })
    }, [])
    const addBank = (e , question , Answer ) => {
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/bank` , {question , Answer})
        .then((res) => {
            console.log(res.data)
            window.location.reload()
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <BankContext.Provider value={{data , addBank}}>
            {children}
        </BankContext.Provider>
    )
}

export default BankContextProvider