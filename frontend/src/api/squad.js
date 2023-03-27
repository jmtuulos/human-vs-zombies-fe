import axios from "."
import { storageRead } from "../utils/storage"


export const getSquadCheckIns = async (squadId) => {
  //gameId is hardcoded here, is it a problem?
  const response =  await axios.get(`${process.env.REACT_APP_API_URL}/game/1/squad/${squadId}/check-in`)
  return response.data
}

export const postSquadCheckIn = async (gameId, squadId, coordinates) => {
  console.log(coordinates)
  console.log("posting squda check in")
  const data = {'latitude': coordinates.latitude, 'longitude': coordinates.longitude}
  const response =  await axios
    .post(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}/check-in`,
      data)
  return response
}

export const getSquad = async (gameId, squadId) => {
  console.log("getSquad ", gameId, squadId)
  const response =  await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}`)
  console.log("getSquad response", response)
  return response.data
}

export const getAllSquads = async (gameId) => {
  const response =  await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad`)
  return response.data
}

export const getSquadChat = async ({gameId}, squadId) => {
  const response =  await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}/chat`)
  return response.data
}

export const createSquad = async (gameId, squadData) => {
  const data =  {
    'name': squadData,
  }
  const response =  await axios
    .post(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad`,
      data)
}

export const joinSquad = async (squadId) => {
  const gameId = storageRead('gameId')
  const data =  {
  }

  const response =  await axios.post(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}/join`, data)
}

export const createSquadChatMessage = async (gameId, squadId, chatMessageData) => {
  const data =  {
    'message': chatMessageData,
  }
  const response =  await axios
    .post(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}/chat`,
      data).catch((error) => {
        console.log("error: " + error)
      })
}

export const leaveSquad = async () => {
  const gameId = storageRead('gameId')
  const response =  await axios.delete(
    `${process.env.REACT_APP_API_URL}/game/${gameId}/squad/leave`)
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
