import axios from "axios";

// Function that takes e and Link and unknown number of parameters that is the body parameters 
export const addQuiston = async (e, link, ...args) => {
    const body = Array.from(args)
    e.preventDefault()
    axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/${link}`, {body})
        .then(res => {
            console.log(res.data)
            window.location.reload()
        })
        .catch((err) => {
            console.log(err)
        })
    console.log(...args)
};