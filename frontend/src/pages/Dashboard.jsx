import axios from "axios"
import { AppBar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect, useState } from "react"

export const DashBoard=()=>{

    const[balance,setBalance] = useState(0)

    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/account/balance',{
            headers : {
                'Authorization' : "Bearer " + localStorage.getItem('token') 
            }
        })
        .then(response=>{
            setBalance(response.data.balance)
        })
    },[balance])


    return <div>
        <AppBar/>
        <div className="m-8">
            <Balance value={balance}/>
        </div>
        <Users/>

    </div>
}