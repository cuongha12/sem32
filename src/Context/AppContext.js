
import axios from 'axios'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
export const AppContext = createContext()
export const AppProvider = ({ children }) => {
    const userCustomer = useSelector((e) => e?.user?.loginUser?.currentUser?.userData)
    const user = useSelector((e) => e?.admin?.login?.currentUser?.userData)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const [category, setCategory] = useState([])
    const [account,setAccount] = useState([])
    const loadCategory = useCallback(async () => {
        try {
            await axios.get('/api/Categories').then((e) => {
                setCategory(e.data)
            })
        } catch (error) {
            message.error("Lỗi hệ thống")
        }
    }, [])
    const loadAccount = useCallback(async () => {
        try {
            await axios.get('/accounts').then((e) => {
                setAccount(e.data.filter((a)=>a.accountID !== user.accountID))
            })
        } catch (error) {
            message.error("Lỗi hệ thống")
        }
    },[user.accountID])
    return (
        <AppContext.Provider
            value={{
                userCustomer, dispatch, navigate, user, loadCategory, category,loadAccount,account
            }}
        >

            {children}
        </AppContext.Provider>
    )
}
