import { useEffect } from "react";
import { $authHost, $host } from "./index";
import {jwtDecode} from "jwt-decode";


export const registration = async (Name, Login, Password) => {
    const {data} = await $host.post('api/user/registration', {Name, Login, Password, PostId: 2, Otdel_id: 2 })
    return jwtDecode(data.token)
}
/*
    "PostId": "2",
    "Otdel_id": "2"
*/
export const login = async (Login, Password) => {
    const {data} = await $host.post('api/user/login', {Login, Password})
    return jwtDecode(data.token)
}
/*
useEffect(async () => {
    const response = await 
})
*/


export const check = async () => {
    const response = await $host.post('api/user/registration', )
    return response
}