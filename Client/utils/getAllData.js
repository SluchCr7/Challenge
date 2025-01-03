import axios from 'axios'
import React, { useState} from 'react'

export const getAllData = async ({link , setter}) => {
    axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/${link}`)
        .then((res) => {
            setter(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}