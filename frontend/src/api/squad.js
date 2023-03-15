import axios from "axios";

const getSquad = async (gameId, squadId) => {
  const response =  await axios.get(`${process.env.API_URL}/game/${gameId}/squad/${squadId}`)
  return response.data
}

const getAllSquads = async (gameId) => {
  const response =  await axios.get(`${process.env.API_URL}/game/${gameId}/squad`)
  return response.data
}

const getSquadChat = async (gameId, squadId) => {
  const response =  await axios.get(`${process.env.API_URL}/game/${gameId}/squad/${squadId}/chat`)
  return response.data
}

const createSquad = async (gameId, squadData) => {
  const response =  await axios.post(`${process.env.API_URL}/game/${gameId}/squad`, squadData)
  return response.status
}

const joinSquad = async (gameId, squadId, squadMemberData) => {
  const response =  await axios.post(`${process.env.API_URL}/game/${gameId}/squad/${squadId}/join`, squadMemberData)
  return response.status
}

const createChatMessage = async (gameId, squadId, chatMessageData) => {
  const response =  await axios.post(`${process.env.API_URL}/game/${gameId}/squad/${squadId}/chat`, chatMessageData)
  return response.status
}

//admin only
const deleteSquad = async (gameId, squadId) => {
  const response =  await axios.delete(`${process.env.API_URL}/game/${gameId}/squad/${squadId}`)
  return response.status
}

const updateSquad = async (gameId, squadId, data) => {
  const response =  await axios.put(`${process.env.API_URL}/game/${gameId}/squad/${squadId}`, data)
  return response.status
}
