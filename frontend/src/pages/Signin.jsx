import { useNavigate } from "react-router-dom"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { useState } from "react"
import axios from 'axios'

export const SignIn=()=>{
    const navigate = useNavigate()
    const[username,setUserName] = useState("")
    const[password,setPassword] = useState("")
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={'sign in'}/>
            <InputBox onChange={(e)=>{
                setUserName(e.target.value)
            }} label={'username'} placeholder={'shaan123'}/>
            <InputBox onChange={(e)=>{
                setPassword(e.target.value)
            }} label={'password'} placeholder={'*******'}/>
            <div className="pt-4">
                <Button onClick={async ()=>{
                    let response =await axios.post('http://localhost:3000/api/v1/user/signin',{
                        username,
                        password
                    })
                    localStorage.setItem('token',response.data.token)
                    localStorage.setItem('id',response.data.userId)
                    navigate('/dashboard')
                }} label={'sign in'}/>
            </div>
            <BottomWarning label={"dont have an account?"} buttonText={'sign up'} to={'/signup'}/>
        </div>
    </div>
    </div>
}