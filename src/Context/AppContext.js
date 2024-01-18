
import axios from 'axios'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
export const AppContext = createContext()
export const AppProvider = ({ children }) => {
    const userCustomer = useSelector((e) => e?.user?.loginUser?.currentUser?.userData)
    const user = useSelector((e) => e?.admin?.login?.currentUser?.userData)
    const token = useSelector((e) => e?.user?.loginUser?.currentUser?.token)
    const cart = useSelector((e) => e?.cart?.currentCart)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const [category, setCategory] = useState([])
    const [account, setAccount] = useState([])
    const [product, setProduct] = useState([])
    const [order,setOrder] = useState([])
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
                setAccount(e.data.filter((a) => a.accountID !== user.accountID))
            })
        } catch (error) {
            message.error("Lỗi hệ thống")
        }
    }, [user?.accountID])

    const loadProduct = useCallback(async () => {
        try {
            await axios.get('/api/Products').then((e) => {
                setProduct(e.data)
            })
        } catch (error) {
            message.error("Lỗi hệ thống")
        }
    }, [])
    const loadOrder = useCallback(async () => {
        try {
            await axios.get('/api/Orders/ByAccount',{
                headers:{
                    Authorization: "Bearer " + token
                }
            }).then((e) => {
                setOrder(e.data)
            })
        } catch (error) {
            message.error("Lỗi hệ thống")
        }
    },[])
    return (
        <AppContext.Provider
            value={{
                userCustomer,
                dispatch,
                navigate,
                user,
                loadCategory,
                category,
                loadAccount,
                account,
                loadProduct,
                product,
                token,
                cart,
                order,
                loadOrder
            }}
        >

            {children}
        </AppContext.Provider>
    )
}
