import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center py-20'>
        <div className={`mx-auto w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-black/10`}>
            <div className="mb-4 flex justify-center">
                <span className="inline-block w-full max-w-[80px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
                Sign in to your account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have an account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium  text-black/80 transition-all duration-200 hover:underline hover:text-gray-900"
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className="text-red-500 mt-6 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-6'>
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    <Button
                        type="submit"
                        className="w-full text-black "
                    >
                        Sign in
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
