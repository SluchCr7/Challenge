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
import Swal from 'sweetalert2'

const AuthContextProvider = (props) => {
    const [loginState, setLoginState] = useState(false)
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [isVerify, setIsVerify] = useState(false)
    // Login Function
    const Login = (Email, Password) => {
        // e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/login` , {Email  , Password})
            .then(res => {
                setUser(res.data)
                setLoginState(true)
                localStorage.setItem('userData', JSON.stringify(res.data))
                toast.success("Login Successfully")
                setTimeout(() => {
                    window.location.href = "/"
                },2000)
            })
            .catch((err) => { 
                toast.error("Login Failed")
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
            .catch(err => toast.error("Logout Failed"))
    }
    // Create New User Function
const registerNewUser = (Name, Email, Password) => {
    axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/register`, { Name, Email, Password })
        .then(res => {
            Swal.fire("Good job!", res.data.message, "success");
            setTimeout(() => {
                window.location.href = "/Auth/Login";
            }, 2000);
        })
        .catch((err) => {
            Swal.fire("Oops!", err.response?.data?.message || "Something went wrong", "error");
        });
};

    // Verify Account
    const verifyAccount = (id , token)=>{
        axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/${id}/verify/${token}`)
        .then((res) => {
            setIsVerify(true)
            toast.success("Account Verified")
        })
        .catch((err) => {
            // console.log(err)
            toast.error("Account Not Verified")
        })
    }
    const UpdatePhoto = async(image, id) => {
        const formData = new FormData();
        formData.append('image', image)
        await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then(() => {
            localStorage.setItem("userData" , JSON.stringify({...user , profilePhoto : res.data}))
            toast.success("Uploading Image Successfully")
        })
        .catch((err) => {
            toast.error("Uploading Image Failed")
        })
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
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <AuthContext.Provider
            value={{ loginState, user, Login, Logout, registerNewUser , users ,  verifyAccount , isVerify , UpdatePhoto}}>
            {props.children}
        </AuthContext.Provider>
    </>
  )
}

export default AuthContextProvider