import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { useNavigate } from "react-router-dom"
import axios from 'axios'


export const SignUp=()=>{
    const navigate = useNavigate()
    const[firstname,setFirstName] = useState("")
    const[lastname,setLastName] = useState("")
    const[username,setUserName] = useState("")
    const[password,setPassword] = useState("")

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={'sign in'}/>
            <InputBox onChange={(e)=>{
                setFirstName(e.target.value)
            }} label={'firstname'} placeholder={'shaan'}/>
            <InputBox onChange={(e)=>{
                setLastName(e.target.value)
            }} label={'lastname'} placeholder={'prasad'}/>
            <InputBox onChange={(e)=>{
                setUserName(e.target.value)
            }} label={'username'} placeholder={'shaan123'}/>
            <InputBox onChange={(e)=>{
                setPassword(e.target.value)
            }} label={'password'} placeholder={'*******'}/>
            <div className="pt-4">
                <Button onClick={async ()=>{
                    const response =await axios.post('http://localhost:3000/api/v1/user/signup',{
                        firstname,
                        lastname,
                        username,
                        password
                    })
                    localStorage.setItem('token',response.data.token)
                    localStorage.setItem('id',response.data.userId)
                    navigate('/dashboard')
                }} label={'sign in'}/>
            </div>
            <BottomWarning label={"already have an account?"} buttonText={'sign in'} to={'/signin'}/>
        </div>
    </div>
    </div>
}