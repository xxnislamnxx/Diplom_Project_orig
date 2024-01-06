import { $authHost, $host } from "./index";


export const getComments = async (Task_id) => {
    const {data} = await $host.post('api/comment/get',{Task_id})
    return data
}

export const setComments = async (Task_id,User_id,Text) => {
    const {data} = await $host.post('api/comment/set',{Task_id,User_id,Text})
    return data
}