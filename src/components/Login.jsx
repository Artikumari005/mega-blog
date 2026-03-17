import React, { useState } from "react";
import {Link , useNavigate } from "react-router-dom"
import {login as authLogin} from '../store/authSlice'
import {useDispatch} from 'react-redux'
import {Button, Input ,Logo} from './index'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'

function Login(){
     const navigate = useNavigate()
        const dispatch = useDispatch()
        const {register, handleSubmit} = useForm()
        const [error , setError] = useState('')

        const login = async(data)=>{
            setError('')
            try{
               const session= await authService.login(data.email, data.password)
               if(session){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate('/')
               }
            } catch (error) {
                setError(error.message)
            }
        }
    return(
       <div className="flex items-center justify-center w-full min-h-screen py-12 bg-gray-50">
        <div className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-gray-200 shadow-lg`}>
                <div className="mb-2 flex justify-center">
                      <span className="inline-block w-full">
<Logo width="100%"></Logo>
                      </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-gray-800">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Don&apos; t have any account? &nbsp;
                    <Link 
                    to='/signup'
                    className="font-medium text-amber-600 transition-colors duration-300
                    hover:underline"> Sign Up
                    </Link>
                    </p>
                    {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                    <form
                    onSubmit={handleSubmit(login)}
                    className="mt-8 space-y-5">
                        <div className="space-y-5">
                            <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email" ,{
                                required: true,
                                 validate: {
                                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                   "Email address must be a valid address",
                                  }
                            })}
                            />
                            <Input
                            label="password"
                            placeholder="enter your password"
                            type="password"
                            {...register("password", {
                                required:true
                                
                            })}
                            />
                            <Button
                            type="submit"
                            className="w-full">
                                Sign In
                            </Button>
                        </div>
                    </form>
                    
        </div>
       </div>
    )
}

export default Login