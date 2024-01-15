import { $authHost, $host } from "./index";


export const currentWork = async (Work_id) => {
    const {data} = await $authHost.post('api/Statistics/currentWork', {Work_id})
    return data
}
export const userInfo = async (Otdel_id) => {
    const {data} = await $host.post('api/Statistics/userInfo',{Otdel_id})
    return data
}

export const allProject = async (Otdel_id) => {
    const {data} = await $host.post('api/Statistics/allProject',{Otdel_id})
    return data
}


export const allTask = async (Work_id) => {
    const {data} = await $host.post('api/Statistics/allTask',{Work_id})
    return data
}

export const detailProject = async (Otdel_id) => {
    const {data} = await $host.post('api/Statistics/detailProject',{Otdel_id})
    return data
}
export const detailTask = async (id) => {
    const {data} = await $host.post('api/Statistics/detailTask',{id})
    return data
}