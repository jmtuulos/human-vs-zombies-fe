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
  const config = {
    headers: {
      // 'player-id': localStorage.getItem('playerId') TODO: add player id to local storage
      'player-id': 1
    }
  }
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/chat`, config)
  return response.data
}

export const createChatMessage = async (gameId, chatMessageData, isHuman, isZombie) => {
  const data =  {
    "message": chatMessageData,
    "isHumanGlobal": isHuman,
    "isZombieGlobal": isZombie,
  }
  const header = {
    'Content-Type': 'application/json',
    'player-id': 1
  }
  const response = await axios
    .post(`${process.env.REACT_APP_API_URL}/game/${gameId}/chat`,
      data,
      {headers: header}).catch((error) => {
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
