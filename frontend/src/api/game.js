import axios from "axios"

export const getGame = async (gameId) => {
  console.log("getGame: " + gameId)
  console.log(`${process.env.REACT_APP_API_URL}/game/${gameId}`)
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}`)
  return response.data
}

export const getAllGames = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/game`)
  console.log("all games:", response.data)
  return response.data
}

export const getFactionChat = async (gameId) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/chat`)
  return response.data
}

export const createChatMessage = async (gameId, chatMessageData) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/game/${gameId}/chat`, chatMessageData)
  return response.status
}

  // admin only
export const deleteGame = async (gameId)  => {
  const response = await axios.delete(`${process.env.REACT_APP_API_URL}/game/${gameId}`)
  return response.status
}

export const updateGame = async (gameId, data) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/game/${gameId}`, data)
  return response.status
}

export const createGame = async (gameData) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/game`, gameData)
  return response.status
}
