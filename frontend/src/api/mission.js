import axios from '.'

export const getAllMissions = async ({gameId}) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/mission`)
  return response.data
}

export const getMission = async (missionId) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/game/1/mission/${missionId}`)
  return response.data
}
