import { useEffect, useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {Button} from "./Button"

export const Users=()=>{

    const [users,setUsers] = useState([])
    const [filter,setFilter] = useState("")
    const filteredUsers = users.filter(user=>user._id!==localStorage.getItem('id'))
    

    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/user/bulk?filter='+filter,{
            headers:{
                'Authorization' : 'Bearer '+localStorage.getItem('token')
            }
            
        })
        .then(response=>{
            setUsers(response.data.user)
        })
    },[filter])


    return <>
    <div className="font-bold mt-6 px-2 text-lg">
        Users
    </div>
    <div className="my-2 px-3">
        <input onChange={(e) => {
            setFilter(e.target.value)
        }} type="text" placeholder="Search users..." className="w-full px-3 py-1 border rounded border-slate-200"></input>
    </div>
    <div className="px-2">
        
        {filteredUsers.map(user => <User key={user._id} user={user} />)}
    </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstname);
            }} label={"Send Money"} />
        </div>
    </div>
}