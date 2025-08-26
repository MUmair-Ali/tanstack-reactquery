import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const fetchData = async (pageNumber) => {
    try {

        const response = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
        return response.data;

    } catch (error) {
        console.log(error)
    }
}

export const fetchDataById = async (id) => {
    try {

        const res = await api.get(`/posts/${id}`);
        console.log(res);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async (id) => {

    try {
       const res =  await api.delete(`/posts/${id}`)
       return res
    } catch(error) {
        console.log(error)
    }
}

export const updatePost = async (id) => {

    try {
       const res =  await api.patch(`/posts/${id}`, {title: "Umair Ali"})
       return res.data
    } catch(error) {
        console.log(error)
    }
}

export const getUsers = async ({pageParam = 1}) => {
    try {

        const res = await api.get(`https://api.github.com/users?per_page=10&page=${pageParam}`)
        return res.data

    } catch (error) {
        console.log(error)
    }
}