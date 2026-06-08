'use client'
import axios from "axios"
import React, { createContext, useEffect, useState } from "react"
import { getAllData } from "@/utils/getAllData"
import { toast } from "react-toastify"

export const MultiGameContext = createContext()

const MultiGameContextProvider = ({ children }) => {
    const [episodes, setEpisodes] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchEpisodes = () => {
        setLoading(true)
        axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/multigame`)
            .then((res) => {
                setEpisodes(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.error("Error fetching Multi-Game Episodes:", err)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchEpisodes()
    }, [])

    const addEpisode = async (episodeData, onSuccess) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/multigame`, episodeData)
            toast.success("Multi-Game Episode Created Successfully!")
            fetchEpisodes()
            if (onSuccess) onSuccess()
        } catch (err) {
            console.error("Error creating Episode:", err)
            toast.error(err.response?.data?.message || "Failed to create Episode.")
        }
    }

    const deleteEpisode = async (id) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/multigame/${id}`)
            toast.success("Episode deleted successfully!")
            fetchEpisodes()
        } catch (err) {
            console.error("Error deleting Episode:", err)
            toast.error("Failed to delete Episode.")
        }
    }

    return (
        <MultiGameContext.Provider value={{ episodes, loading, fetchEpisodes, addEpisode, deleteEpisode }}>
            {children}
        </MultiGameContext.Provider>
    )
}

export default MultiGameContextProvider
