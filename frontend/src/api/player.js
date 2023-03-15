import axios from 'axios';

const getPlayer = async (id) => {
  const response = await axios.get(`${process.env.API_URL}/game/player/${id}`)
  return response.data
}

const listPlayers = async (gameId) => {
  const response = await axios.get(`${process.env.API_URL}/game/${gameId}/player`)
  return response.data
}

//Admin only
const updatePlayer = async (id, data) => {
  const response = await axios.put(`${process.env.API_URL}/game/player/${id}`, data)
  return response.status
}

const deletePlayer = async (id) => {
  const response = await axios.delete(`${process.env.API_URL}/game/player/${id}`)
  return response.status
}

const createPlayer = async (gameId, playerData) => {
  const response = await axios.post(`${process.env.API_URL}/game/${gameId}/player`, playerData)
  return response.status
}
