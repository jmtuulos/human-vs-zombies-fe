import axios from "axios";

export const getSquad = async (gameId, squadId) => {
  const response =  await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}`)
  return response.data
}

export const getAllSquads = async (gameId) => {
  const response =  await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad`)
  return response.data
}

export const getSquadChat = async (gameId, squadId) => {
  const response =  await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}/chat`)
  return response.data
}

export const createSquad = async (gameId, squadData) => {
  const response =  await axios.post(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad`, squadData)
  return response.status
}

export const joinSquad = async (gameId, squadId, squadMemberData) => {
  const response =  await axios.post(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}/join`, squadMemberData)
  return response.status
}

export const createChatMessage = async (gameId, squadId, chatMessageData) => {
  const response =  await axios.post(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}/chat`, chatMessageData)
  return response.status
}

//admin only
export const deleteSquad = async (gameId, squadId) => {
  const response =  await axios.delete(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}`)
  return response.status
}

export const updateSquad = async (gameId, squadId, data) => {
  const response =  await axios.put(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}`, data)
  return response.status
}
