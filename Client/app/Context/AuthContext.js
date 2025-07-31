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
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [isVerify, setIsVerify] = useState(false)
    const [isAuthChecked, setIsAuthChecked] = useState(false)
    const [isLogin , setIsLogin] = useState(false)
    // Login Function
    const Login = (Email, Password) => {
        // e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/login` , {Email  , Password})
            .then(res => {
                setUser(res.data)
                setIsLogin(true)
                setIsAuthChecked(true)
                localStorage.setItem('userData', JSON.stringify(res.data))
                localStorage.setItem('loginChallengeState', "true")
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
                    setIsLogin(false)
                    setIsAuthChecked(false)
                    setUser({})
                    localStorage.removeItem('userData')
                    localStorage.removeItem('loginChallengeState')
                    window.location.href = "/Auth/Login"
                }
            })
            .catch(err => toast.error("Logout Failed"))
    }
    // Create New User Function
const registerNewUser = (Name, Email, Password) => {
  axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/register`, {
    Name, Email, Password
  })
    .then(res => {
      Swal.fire("Good job!", res.data.message, "success");
      setTimeout(() => {
        window.location.href = "/Auth/Login";
      }, 2000);
    })
    .catch((err) => {
      console.error("Registration Error:", err);
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
    const storedUser = localStorage.getItem('userData')
    const loginState = localStorage.getItem('loginChallengeState');

    if (storedUser && loginState === 'true') {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    setIsAuthChecked(true);
  }, []);
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
            value={{ isLogin , isAuthChecked, user, Login, Logout, registerNewUser , users ,  verifyAccount , isVerify , UpdatePhoto}}>
            {props.children}
        </AuthContext.Provider>
    </>
  )
}

export default AuthContextProvider