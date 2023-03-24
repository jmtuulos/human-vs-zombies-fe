import axios from "."

export const registerUser = async (token) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, token)
    return response
}

export const getAllPlayersByUuid = async (token) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/players`, token)
    console.log(response.data)
    return response.data
}