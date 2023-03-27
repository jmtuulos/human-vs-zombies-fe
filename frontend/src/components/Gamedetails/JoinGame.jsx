import { Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { joinGame } from "../../api/game"
import { getAllPlayersByUuid } from "../../api/user"
import { useAppUser } from "../../context/AppUserContext"
import { storageRead } from "../../utils/storage"

export const JoinGameButton = () => {
  const { appUser, setAppUser } = useAppUser()
  const gameId = storageRead('gameId')

  const mutation = useMutation(
    { mutationFn: () => joinGame(),
     onSuccess: (data) => {
        getAllPlayersByUuid().then( (data) => {
          const currentGamePlayer = data.find((game) => game.gameId === gameId)
          const newGame = {gameId: gameId, playerId: currentGamePlayer.playerId }
          setAppUser(...appUser, newGame)
        })
     }}
    )

  const handleJoinGame = () => {
    mutation.mutate()
  }

  return (
  <Button variant="contained"
    onClick={handleJoinGame}
  >Join game</Button>
  )
}
