import React from "react";
import { useDispatch } from "react-redux";
import authService  from "../appwrite/auth";
import { logout } from "../store/authSlice";
function LogoutBtn(){
    const dispatch = useDispatch()
    const handleLogout = () =>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
    return (
       <button onClick={handleLogout} className="inline-block px-4 py-2 duration-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg font-medium">
        Logout
       </button>
    )
}
export default LogoutBtn;
