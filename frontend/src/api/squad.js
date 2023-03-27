import axios from "."
import { storageRead } from "../utils/storage"


export const getSquadCheckIns = async (squadId) => {
  const response =  await axios.get(`${process.env.REACT_APP_API_URL}/game/1/squad/${squadId}/check-in`)
  return response.data
}

export const postSquadCheckIn = async (gameId, squadId, coordinates) => {
  const playerId = 9 // placeholder, can be removed when UUID implemented
  const data = {'latitude': coordinates.latitude, 'longitude': coordinates.longitude}
  const header = {
    'player-id': playerId
  }
  const response =  await axios
    .post(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}/check-in`,
      data,
      {headers: header})
  return response
}
export const getSquad = async (gameId, squadId) => {
  const response =  await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}`)
  return response.data
}

export const getAllSquads = async (gameId) => {
  const response =  await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad`)
  return response.data
}

export const getSquadChat = async ({gameId}, squadId) => {
  console.log("gameid:", gameId, "squadid:", squadId)
  const response =  await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}/chat`)
  return response.data
}

export const createSquad = async (playerId, gameId, squadData) => {
  const data =  {
    'name': squadData,
  }
  const header = {
    'Content-Type': 'application/json',
    'player-id': playerId
  }
  const response =  await axios
    .post(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad`,
      data,
      {headers: header})
      .catch((error) => {
    console.log("error: " + error)
  })
}

export const joinSquad = async (squadId) => {
  const gameId = storageRead('gameId')
  const data =  {
  }
  
  const response =  await axios.post(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}/join`, data, {headers: header})
}

export const createSquadChatMessage = async (gameId, squadId, chatMessageData) => {
  const data =  {
    'message': chatMessageData,
  }
  const header = {
    'Content-Type': 'application/json',
    'player-id': 1
  }
  const response =  await axios
    .post(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}/chat`,
      data,
      {headers: header}).catch((error) => {
        console.log("error: " + error)
      })
}

export const leaveSquad = async (playerId) => {
  const header = {
    'Content-Type': 'application/json',
    'player-id': playerId
  }
  const response =  await axios.delete(
    `${process.env.REACT_APP_API_URL}/game/1/squad/leave`,
    {headers: header})
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
