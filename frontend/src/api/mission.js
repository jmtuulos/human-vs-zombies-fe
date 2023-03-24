import axios from "."
import { storageRead } from "../utils/storage"

export const getMissions = async (gameId) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/mission`)
    return response.data
}

export const getMission = async (gameId, missionId) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/mission/${missionId}`)
    return response.data
}

export const updateMission = async (gameId, missionId, data) => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/game/${gameId}/mission/${missionId}`, data)
    return response.data
}

export const createMission = async (gameId, data) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/game/${gameId}/mission`, data)
    return response.data
}

export const deleteMission = async (gameId, missionId) => {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/game/${gameId}/mission/${missionId}`)
    return response.data
}

export const getAllMissions = async () => {
    const gameId = storageRead('gameId')
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/mission`)
    return response.data
}
