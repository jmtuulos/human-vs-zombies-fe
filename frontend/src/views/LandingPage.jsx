import { Button } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { getAllGames } from "../api/game"
import { NumberOfPlayers } from "../components/Gamedetails/NumberOfPlayers"
import { storageRead, storageSave } from "../utils/storage"
import { json, useNavigate } from "react-router-dom"
import GameDetails from "./GameDetails"
import { useUser } from "../context/UserContext"
import { getPlayer } from "../api/player"
import { useEffect } from "react"

const LandingPage = () => {

  const navigate = useNavigate()

  //Temp userCreation
  const { user, setUser } = useUser(null)
  //set user with useEffect

  //

  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['title'],
    queryFn: () => getAllGames(),
    staleTime: 10000
  })

  // useEffect(() => {
  //   console.log(user)
  //   storageSave('user', user)
  // })

  const handleSelectClick = (e) => {
    setUser(JSON.stringify({
      "isHuman": true,
      "biteCode": "hw4a",
      "fullName": "Admin Admin",
      "squadId": 1
    }))
    storageSave('gameId', e.id)
    storageSave('user', JSON.stringify({
      "isHuman": true,
      "biteCode": "hw4a",
      "fullName": "Admin Admin",
      "squadId": 1
    }))
    console.log("User: ", user)
    navigate('/gamedetails')

  }

  return (
    <div>
      <h3 className="text-center">Current games</h3>
      {data &&
        <div className="card">
          <ul className="list-group list-group-flush">
              {data.map((e) =>
                <li key={e.id} className="list-group-item">
                  <Button onClick={() => handleSelectClick(e)} variant="text">
                    {e.name} - {e.gameState} - players: <NumberOfPlayers id={e.id}/> - started: {e.startDateTime} ||| {e.description}</Button>
                </li>)
              }
          </ul>
        </div>
      }
    </div>
  )
}

export default LandingPage
