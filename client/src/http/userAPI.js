import { $authHost, $host } from "./index";

export const registration = async (Name, Login, Password) => {
    const response = await $host.post('api/user/registration', {Name, Login, Password, PostId: 2, Otdel_id: 2 })
    return response
}
/*
    "PostId": "2",
    "Otdel_id": "2"
*/
export const login = async (Login, Password) => {
    const response = await $host.post('api/user/login', {Login, Password})
    return response
}

export const check = async () => {
    const response = await $host.post('api/user/registration', )
    return response
}