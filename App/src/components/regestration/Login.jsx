import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../layout/Button'
import Input from '../layout/Input'
import { set, useForm } from 'react-hook-form'
export default function Login() {

    const [user , setUser] = useState(null)
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    function login (data) {
        console.log(data);
        if(data){
            setUser(data)
            navigate('/home');
        }else{
            alert("Incorrect Detailes")
        }
    }

    return (
        <div className="flex items-center min-h-screen px-4">
            <div className="w-full max-w-md space-y-4 mx-auto p-10 bg-gray-50 rounded-md">
                <div className="text-center">
                    <div className="text-3xl font-bold mb-3 uppercase">Login</div>
                    <div className="text-gray-500 dark:text-gray-400">Enter your email below to login to your account</div>
                </div>
                <form onSubmit={handleSubmit(login)} className="space-y-4">
                    <div className="space-y-2">
                        <Input 
                            label={"Email"} 
                            id="email" 
                            placeholder="Enter Email..." 
                            type="email" 
                            {...register('email', { 
                                required: true,
                                validate: {
                                    email: (value) => value.includes('@') || 'Invalid email'
                                }
                            })}
                        />

                        <Input label={"Password"} id="password" type="password" placeholder='Password' {...register('password', { required: true })}/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type='checkbox' id="remember-me" />
                        <label className="text-sm" htmlFor="remember-me">
                            Remember me
                        </label>
                    </div>
                    <Button className="w-full" type='submit'>Login</Button>
                </form>
                <div className="text-center text-sm">
                    Don't have an account? <Link to={"/signup"} className="underline font-medium" href="#">Sign up</Link>
                </div>
            </div>
        </div>
    )
}
