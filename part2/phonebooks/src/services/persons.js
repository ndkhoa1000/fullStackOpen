import axios from "axios";
const baseUrl = process.env.BASE_URL

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}


const create = (newObject) => {
    const request = axios.post(baseUrl,newObject)
    return request.then(res => res.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res => res.data)
}
const update = (id, object) => {
    const request = axios.put(`${baseUrl}/${id}`, object)
    return request.then(res => res.data)
}
export default {getAll, create, remove, update}
