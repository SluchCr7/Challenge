'use client'
import { getAllData } from '@/utils/getAllData'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
export const AuthContext = createContext()
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import swal from "sweetalert"
const AuthContextProvider = (props) => {
    const [loginState, setLoginState] = useState(false)
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [isVerify, setIsVerify] = useState(false)

    // Login Function
    const Login = (Email, Password, e) => {
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/login` , {Email  , Password})
            .then(res => {
                setUser(res.data)
                setLoginState(true)
                localStorage.setItem('userData', JSON.stringify(res.data))
                swal("Good job!", res.data.message, "success");
            })
            .catch((err) => { 
                swal("Oops!", err.response.data.message, "error");
            })
            .finally(() => {
                window.location.href = "/"
            })
    }
    // Logout Function
    const Logout = () => {
        swal({
            title: "Are you sure?",
            text: "You are go to logout from your account !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(willLogout => {    
                if (willLogout) {
                    setLoginState(false)
                    setUser({})
                    localStorage.removeItem('userData')
                    window.location.href = "/Auth/Login"
                }
            })
            .catch(err => console.log(err))
    }
    // Create New User Function
    const registerNewUser = (Name, Email, Password, e) => {
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/register` , {Name , Email , Password})
            .then(res => {
                swal("Good job!", res.data.message, "success");
                setTimeout(() => {
                    window.location.href = "/Auth/Login"
                },2000)
            })
            .catch((err) => {
                swal("Oops!", err.response.data.message, "error");
            })
    }
    // Verify Account
    const verifyAccount = (id , token)=>{
        axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/${id}/verify/${token}`)
        .then((res) => {
            setIsVerify(true)
            toast.success("Account Verified")
        })
        .catch((err) => {
            console.log(err)
        })
    }
    // Upload New Photo (Change Profile Photo)
    const changeProfilePhoto = async(image , id) => {
        const formData = new FormData();
        formData.append('image', image); 
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/photo/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(res => {
                    localStorage.setItem("userData" , JSON.stringify({...user , profilePhoto : res.data}))
                    toast.success("Uploading Image Successfully")
            })
        } catch (error) {
            console.error('Error uploading the file:', error);
        }
    }

    useEffect(() => {
        const user = localStorage.getItem('userData')
        if(user){
            setUser(JSON.parse(user))
            setLoginState(true)
        }
    }, [])
    useEffect(() => {
        getAllData({ link: 'auth', setter: setUsers })
    }, [])
  return (
    <>  
        <ToastContainer/>
        <AuthContext.Provider
            value={{ loginState, user, Login, Logout, registerNewUser , users ,  verifyAccount , isVerify , changeProfilePhoto}}>
            {props.children}
        </AuthContext.Provider>
    </>
  )
}

export default AuthContextProvider