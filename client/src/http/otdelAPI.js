import { $authHost, $host } from "./index";
import {jwtDecode} from "jwt-decode";


export const createOtdel = async (Name, Director_Id) => {
    const {data} = await $authHost.post('api/otdel', {Name, Director_Id})
    return data
}
/*
Нужно добавить в Server Проверку на роль: Админ
*/
export const getOtdel = async () => {
    const {data} = await $host.get('api/otdel/getAll')
    return data
}