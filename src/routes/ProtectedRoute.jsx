
import { Navigate, Outlet } from "react-router-dom"
import Cookies from 'js-cookie';

export const ProtectedRouteAuthenticated = ({ element }) => {
    const user = Cookies.get('token')
    return user ? element : <Navigate to="/" />
}

export const ProtectedRouteGuest = ({ element }) => {
    const user = Cookies.get('token')
    return !user ? element : <Navigate to="/dashboard" />
}