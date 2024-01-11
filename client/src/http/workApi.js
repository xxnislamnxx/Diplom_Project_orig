import { $authHost, $host } from "./index";


export const setWork = async (Otdel_id,Text,Completed) => {
    const {data} = await $host.post('api/work/setWork',{Otdel_id,Text,Completed})
    return data
}
export const setTask = async (Work_id,User_id,Text,Completed) => {
    const {data} = await $host.post('api/work/setTask',{Work_id,User_id,Text,Completed})
    return data
}

/*------------*/
export const updWork = async (id,Completed) => {
    const {data} = await $host.post('api/work/updWork',{id,Completed})
    return data
}
export const updTask = async (id,Completed) => {
    const {data} = await $host.post('api/work/updTask',{id,Completed})
    return data
}

/*------------*/
export const delWork = async (Work_id) => {
    const {data} = await $host.put('api/work/delWork',{Work_id})
    return data
}
export const delTask = async (Work_id) => {
    const {data} = await $host.put('api/work/delWork',{Work_id})
    return data
}

/*------------*/
export const getWork = async (Otdel_id) => {
    const {data} = await $host.post('api/work/WorkList',{Otdel_id})
    return data
}
export const getTask = async (Work_id,Sort,Dir) => {
    const {data} = await $host.post('api/work/TaskList',{Work_id,Sort,Dir})
    return data
}