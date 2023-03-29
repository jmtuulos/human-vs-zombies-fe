import { Button, Paper } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { getAllGames } from "../api/game"
import { NumberOfPlayers } from "../components/Gamedetails/NumberOfPlayers"
import { storageRead, storageSave } from "../utils/storage"
import { json, useNavigate } from "react-router-dom"
import GameDetails from "./GameDetails"
import { useUser } from "../context/UserContext"
import { getPlayer } from "../api/player"
import { useEffect, useState } from "react"
import { getAllPlayersByUuid } from "../api/user"

const LandingPage = () => {

  const navigate = useNavigate()
  const { user, setUser } = useUser()
  const [ gameCenter, setGameCenters ] = useState()
  const gameId = storageRead('gameId')

  const { isError, isLoading, data, error } = useQuery(
    {
      queryKey: ['title'],
      queryFn: () => getAllGames(),
      staleTime: 10000
    })

  const handleSelectClick = (e) => {
    storageSave('gameId', e.id)
    navigate('/gamedetails')
  }

  //useEffect to save game center
  useEffect(() => {
    const fetchGame = async () => {
      await getAllGames().then((data) => {
        storageSave('gameCoordinates', JSON.stringify(data.map((game) => game.mapCoordinates)))

      })
    }
    fetchGame()
    console.log("", gameCenter)
  }, [])



  //useEffect to save player data
  useEffect(() => {
    const fetchUser = async () => {
      await getAllPlayersByUuid().then((data) => {
        return data.find(gameList => gameList.gameId == gameId)})
        .then(async (data) => {
          let currentPlayer = null
          if (data){
            currentPlayer = await getPlayer(data.playerId)
            setUser({...currentPlayer, playerId: data.playerId})
          }
        }).catch(
          (error) => {
            console.log(error)
          }
        )
      }
    fetchUser()
  }, [])

  return (
      <>
      <h3 className="text-center">Current games (click for details) </h3>
      {data &&
      <div className="p-5">
        <Paper sx={{ maxWidth: 1, backgroundColor: '#e9e3d6fc', borderRadius: 2}}>
          <ul className="list-group list-group-flush" style={{ backgroundColor: '#e9e3d6a3' }}>
            {data.map((e) =>
              <li key={e.id} className="list-group-item" style={{ backgroundColor: '#e9e3d6a3' }}>
                <Button onClick={() => handleSelectClick(e)} variant="text" style={{ color: '#524e45' }}>
                  {e.name}  &emsp; &#x25cf; &emsp;  {e.gameState} &emsp; &#x25cf; &emsp; players: {e.playerCount} &emsp; &#x25cf; &emsp; started: {new Date(e.startDateTime).toString().slice(0, 21)}
                </Button>
              </li>)
            }
          </ul>
        </Paper>
      </div>
      }
      </>
  )
}

export default LandingPage
