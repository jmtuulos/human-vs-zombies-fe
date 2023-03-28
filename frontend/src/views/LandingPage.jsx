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

  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['title'],
    queryFn: () => getAllGames(),
    staleTime: 10000
  })

  const handleSelectClick = (e) => {
    storageSave('gameId', e.id)
    navigate('/gamedetails')
  }

  return (
    <div>
      <h3 className="text-center">Current games (click for details) </h3>
      {data &&
        <div className="card">
          <ul className="list-group list-group-flush" style={{backgroundColor: '#e9e3d6a3'}}>
              {data.map((e) =>
                <li key={e.id} className="list-group-item" style={{backgroundColor: '#e9e3d6a3'}}>
                  <Button onClick={() => handleSelectClick(e)} variant="text" style={{color: '#524e45'}}>
                    {e.name}  &emsp; &#x25cf; &emsp;  {e.gameState} &emsp; &#x25cf; &emsp; players: <NumberOfPlayers id={e.id}/> &emsp; &#x25cf; &emsp; started: { Date (e.startDateTime).toString().slice(0, 21) } &emsp; &#x25cf; &emsp; {e.description}</Button>
                </li>)
              }
          </ul>
        </div>
      }
    </div>
  )
}

export default LandingPage
