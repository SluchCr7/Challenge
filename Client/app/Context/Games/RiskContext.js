'use client'
import { getAllData } from "@/utils/getAllData";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const RiskContext = createContext();

const RiskContextProvider = ({ children }) => {
    const [risk, setRisk] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRisk = async () => {
        setLoading(true);
        setError(null);
        try {
            const backUrl = process.env.NEXT_PUBLIC_BACK_URL || "http://localhost:3001";
            const res = await axios.get(`${backUrl}/api/resk`);
            let data = res.data;
            if (data && !Array.isArray(data)) {
                if (Array.isArray(data.data)) data = data.data;
                else if (Array.isArray(data.risk)) data = data.risk;
                else if (Array.isArray(data.resk)) data = data.resk;
                else data = [];
            }
            setRisk(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching Risk categories:", err);
            setError(err?.response?.data?.message || err.message || "Failed to load arena data");
            setRisk([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRisk();
    }, []);

    const addRisk = (e, name, Easy, Medium, Hard, Expert) => {
        e.preventDefault();
        const backUrl = process.env.NEXT_PUBLIC_BACK_URL || "http://localhost:3001";
        axios.post(`${backUrl}/api/resk`, { name, Easy, Medium, Hard, Expert })
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <RiskContext.Provider value={{ risk, addRisk, loading, error, fetchRisk }}>
            {children}
        </RiskContext.Provider>
    );
};

export default RiskContextProvider