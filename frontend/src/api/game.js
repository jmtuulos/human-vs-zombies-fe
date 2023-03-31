import axios from "."
import { storageRead } from "../utils/storage"

export const getGame = async (gameId) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}`)
  return response.data
}

export const getAllGames = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/game`)
  return response.data
}

export const getFactionChat = async (gameId) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/chat`)
  return response.data
}

export const createChatMessage = async (gameId, chatMessageData, isHuman, isZombie) => {
  const data =  {
    "message": chatMessageData,
    "isHumanGlobal": isHuman,
    "isZombieGlobal": isZombie,
  }
  const response = await axios
    .post(`${process.env.REACT_APP_API_URL}/game/${gameId}/chat`,
      data).catch((error) => {
        console.log("error: " + error)
      })
}

export const joinGame = async () => {
  const gameId = storageRead('gameId')
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/game/${gameId}/player`)
}

  // admin only
export const deleteGame = async (gameId)  => {
  const response = await axios.delete(`${process.env.REACT_APP_API_URL}/game/${gameId}`)
  return response
}

export const updateGame = async (gameId, data) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/game/${gameId}`, data)
  return response
}

export const createGame = async (gameData) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/game`, gameData)
  return response
}
