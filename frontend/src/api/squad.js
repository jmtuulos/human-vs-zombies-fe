import axios from "."

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

export const joinSquad = async (gameId, squadId, squadMemberData) => {
  const response =  await axios.post(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}/join`, squadMemberData)
  return response.status
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

//admin only
export const deleteSquad = async (gameId, squadId) => {
  const response =  await axios.delete(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}`)
  return response.status
}

export const updateSquad = async (gameId, squadId, data) => {
  const response =  await axios.put(`${process.env.REACT_APP_API_URL}/game/${gameId}/squad/${squadId}`, data)
  return response.status
}
