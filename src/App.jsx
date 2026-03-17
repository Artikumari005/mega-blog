import { useState , useEffect} from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Header } from './components'
import { Footer } from './components'
import { Outlet } from 'react-router-dom'
import './index.css'
function App() {
  const [loading , setLoading] =useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .catch(()=>{
      dispatch(logout())
    })
    .finally(()=>{
      setLoading(false)
    })
  }, [])
  return !loading? (
    <div className='min-h-screen flex flex-col bg-gray-100'>
      <Header/>
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer/>
    </div>
  ):null
}

export default App
