import axios from '.'

export const getBite = async (gameId, biteId) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/bite/${biteId}`)
  return response.data
}

export const getAllBites = async (gameId) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/bite`)
  return response.data
}

export const createBite = async({gameId}, biteCode, description, coords) => {
  if (!coords)
    coords = {latitude: 0, longitude: 0}
  const data = {
    biteCode: biteCode,
    story: description,
    latitude: coords.latitude,
    longitude: coords.longitude
  }

  const response = await axios.post(`${process.env.REACT_APP_API_URL}/game/${gameId}/bite`, data)
  return response.status
}

//admin only
export const deleteBite = async(gameId, biteId) => {
  const response = await axios.delete(`${process.env.REACT_APP_API_URL}/game/${gameId}/bite/${biteId}`)
  return response.status
}

export const updateBite = async(gameId, biteId, data) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/game/${gameId}/bite/${biteId}`, data)
  return response.status
}


