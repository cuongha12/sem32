import React, { useContext, useEffect } from 'react'
import '../../../App.css'
import Header from '../header/header'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/footer'
import { AppContext } from '../../../Context/AppContext'
import { fetchCartCount } from '../../../redux/CartSlice'

const Main = () => {
    const { dispatch, userCustomer, token } = useContext(AppContext)
    useEffect(() => {
        if (userCustomer) {
            dispatch(fetchCartCount(token))
        }
    }, [dispatch,userCustomer, token])
    return (
        <div className="App">
            <Header></Header>

            <Outlet />
            <Footer />
        </div>
    )
}

export default Main