import axios from '.'

export const getPlayer = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/game/1/player/${id}`)
  return response.data
}

export const listPlayers = async (gameId) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/player`)
  return response.data
}

//Admin only
export const updatePlayer = async (id, data) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/game/player/${id}`, data)
  return response.status
}

export const deletePlayer = async (id) => {
  const response = await axios.delete(`${process.env.REACT_APP_API_URL}/game/player/${id}`)
  return response.status
}

export const createPlayer = async (gameId, playerData) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/game/${gameId}/player`, playerData)
  return response.status
}
