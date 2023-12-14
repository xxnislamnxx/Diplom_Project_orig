import { $authHost, $host } from "./index";


export const getWork = async (Otdel_id) => {
    const {data} = await $host.post('api/work/WorkList',{Otdel_id})
    return data
}