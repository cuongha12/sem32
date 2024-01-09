
import axios from 'axios'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
export const AppContext = createContext()
export const AppProvider = ({ children }) => {
    const userCustomer = useSelector((e) => e?.user?.loginUser?.currentUser?.userData)
    const user = useSelector((e) => e?.user?.login?.current?.userData)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    return (
        <AppContext.Provider
            value={{
                userCustomer,dispatch,navigate,user
            }}
        >

            {children}
        </AppContext.Provider>
    )
}
