import axios from "axios"


const getGame = async (gameId) => {
  const response = await axios.get(`${process.env.API_URL}/game/${gameId}`)
  return response.data
}

const getAllGames = async () => {
  const response = await axios.get(`${process.env.API_URL}/game`)
  return response.data
}

const getFactionChat = async (gameId) => {
  const response = await axios.get(`${process.env.API_URL}/game/${gameId}/chat`)
  return response.data
}

const createChatMessage = async (gameId, chatMessageData) => {
  const response = await axios.post(`${process.env.API_URL}/game/${gameId}/chat`, chatMessageData)
  return response.status
}

  // admin only
const deleteGame = async (gameId)  => {
  const response = await axios.delete(`${process.env.API_URL}/game/${gameId}`)
  return response.status
}

const updateGame = async (gameId, data) => {
  const response = await axios.put(`${process.env.API_URL}/game/${gameId}`, data)
  return response.status
}

const createGame = async (gameData) => {
  const response = await axios.post(`${process.env.API_URL}/game`, gameData)
  return response.status
}
