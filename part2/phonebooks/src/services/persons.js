import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL
console.log(baseUrl)
const getAll = async() => {
    const request = await axios.get(baseUrl).then(res => res.data)
    console.log(request)
    return await request
}

const create = async(newObject) => {
    const request = await axios.post(baseUrl,newObject).then(res => res.data)
    console.log(request)
    return request
}

const remove = async (id) => {
    const request = await axios.delete(`${baseUrl}/${id}`).then(res => res.data)
    console.log(request)
    return request
}
const update = async(id, object) => {
    const request = await axios.put(`${baseUrl}/${id}`, object)
    .then(res => res.data)
    console.log(request)
    return request
}
export default {getAll, create, remove, update}
