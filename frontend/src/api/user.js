import axios from "."

export const registerUser = async () => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`)
    return response
}

export const getAllPlayersByUuid = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/players`)
    return response.data
}