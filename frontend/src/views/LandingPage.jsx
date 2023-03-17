import { Button } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { getAllGames } from "../api/game"
import { NumberOfPlayers } from "../components/Gamedetails/NumberOfPlayers"
import { storageSave } from "../utils/storage"
import { useNavigate } from "react-router-dom"
import GameDetails from "./GameDetails"

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
