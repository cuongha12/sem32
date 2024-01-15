import { loginFailed, loginStart, loginSuccess, logoutStart, logoutSuccess } from "./AdminSlice";
import { fetchCartCount } from "./CartSlice";
import { loginUserFailed, loginUserStart, loginUserSuccess, logoutUserStart, logoutUserSuccess } from "./UserSlice"
import axios from "axios";
export const loginUser = async (value, dispatch, message, navigate) => {
    dispatch(loginUserStart())
    try {
        const res = await axios.post("/api/AccountControllers/login", value)
        if (!res.data.userData.status) {
            dispatch(loginUserFailed())
            message.success('Tài khoản bạn đã bị khoá')
        } else {
            dispatch(loginUserSuccess(res.data))
            message.success('Đăng nhập thành công')
            navigate("/")
        }
    } catch (error) {
        dispatch(loginUserFailed())
        message.error('Đăng nhập thất bại')
    }
}


export const logOutUser = async (dispatch) => {
    dispatch(logoutUserStart())
    dispatch(logoutUserSuccess(''))
    dispatch(fetchCartCount(''))
    return
}



export const loginAdmin = async (value, dispatch, message, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post("/api/AccountControllers/login", value)
        if (!res.data.userData.status) {
            dispatch(loginFailed())
            message.success('Tài khoản bạn đã bị khoá')
        } else {
            if (res.data.userData.roleName === "user") {
                dispatch(loginFailed())
                message.error('Đăng nhập thất bại')
                return
            } else {
                dispatch(loginSuccess(res.data))
                message.success('Đăng nhập thành công')
                navigate("/admin")
            }
        }
    } catch (error) {
        dispatch(loginFailed())
        message.error('Đăng nhập thất bại')
    }
}

export const addCart = async (userCustomer, value, dispatch, message, token) => {
    try {
        await axios.post('/api/Carts/AddProductToCart', value, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(() => {
            dispatch(fetchCartCount(token))
        })
    } catch (error) {
        message.error('Lỗi hệ thống')
    }
}

export const updateCart = async (id, action, dispatch, message, token, setLoading) => {
    try {
        await axios.put(`/api/Carts/${id}?type=${action}`).then(() => {
            dispatch(fetchCartCount(token))
            setLoading(false)
        })
    } catch (error) {
        message.error('Lỗi hệ thống')
    }
}

export const deleteCart = async (id, dispatch, message, setLoading, token) => {
    try {
        await axios.delete(`/api/Carts/${id}`).then(() => {
            dispatch(fetchCartCount(token))
            setLoading(false)
        })
    } catch (error) {
        message.error('Lỗi hệ thống')
    }
}


export const deleteManyCart = async (value, dispatch, message, setLoading, token, setSelectedRowKeys) => {
    try {
        await axios.delete('/api/Carts/DeleteMultiple', {
            data: value
        }).then(() => {
            dispatch(fetchCartCount(token))
            setLoading(false)
            setSelectedRowKeys([])
        })
    } catch (error) {
        message.error('Lỗi hệ thống')
    }
}



export const logOutAdmin = async (dispatch, navigate) => {
    dispatch(logoutStart())
    dispatch(logoutSuccess(''))
    navigate("/admin/login")
}