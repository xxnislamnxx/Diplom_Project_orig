import { $authHost, $host } from "./index";


export const getWork = async () => {
    const {data} = await $host.post('api/work/WorkList')
    return data
}