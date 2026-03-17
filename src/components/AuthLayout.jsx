import React ,{useEffect, useState} from "react";
import{useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'


export default function AuthLayout({children , authentication = true}){
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    
    useEffect(()=>{
      // Only redirect after we've checked auth status
      if(loader) return;
      
      if(authentication && authStatus !== authentication){
       navigate('/login')
      }else if(!authentication && authStatus !== authentication){
        navigate("/")
      }
    },[authStatus, navigate, authentication, loader])
    
    useEffect(() => {
        // Check auth status on mount
        const checkAuth = async () => {
            setLoader(false)
        }
        checkAuth()
    }, [])
    
    if (loader) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
            </div>
        )
    }
    
    return children
}
