import axios from "."
import { useUser } from "../context/UserContext"
import { storageRead } from "../utils/storage"

export const getAllMissions = async (isHuman) => {
  const gameId = storageRead('gameId')
  let filteredMissions = []
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}/mission`)
  if (response.data){
    filteredMissions = response.data.filter((mission) => mission.isHumanVisible == isHuman)
    return filteredMissions
  }
  return response.data
}

export const getMission = async (missionId) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/game/1/mission/${missionId}`)
  return response.data
}
