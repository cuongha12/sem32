import { loginFailed, loginStart, loginSuccess, logoutStart, logoutSuccess } from "./AdminSlice";
import { loginUserFailed, loginUserStart, loginUserSuccess, logoutUserFailed, logoutUserStart, logoutUserSuccess } from "./UserSlice"
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


export const logOutAdmin = async (dispatch,navigate) => {
    dispatch(logoutStart())
    dispatch(logoutSuccess(''))
    navigate("/admin/login")
}