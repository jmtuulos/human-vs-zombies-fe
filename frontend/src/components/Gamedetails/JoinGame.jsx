import { Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { joinGame } from "../../api/game"
import { getPlayer } from "../../api/player"
import { getAllPlayersByUuid } from "../../api/user"
import { useAppUser } from "../../context/AppUserContext"
import { useUser } from "../../context/UserContext"
import keycloak from "../../keycloak"
import { storageRead } from "../../utils/storage"

export const JoinGameButton = () => {
  const { appUser, setAppUser } = useAppUser()
  const { user, setUser } = useUser()
  const gameId = storageRead('gameId')

  const disableJoinButton =
    appUser.some((game) => game.gameId === gameId)

  const mutation = useMutation(
    { mutationFn: () => joinGame(),
     onSuccess: () => {
        getAllPlayersByUuid().then( (data) => {
          const currentGamePlayer = data.find((game) => game.gameId === gameId)
          const newGame = {gameId: gameId, playerId: currentGamePlayer.playerId }
          setAppUser([...appUser, newGame])
          return (currentGamePlayer)
        }).then( async (data) => {
          const currentPlayer = await getPlayer(data.playerId)
          setUser({...currentPlayer, playerId: data.playerId})
        }
        )
     }}
    )

  const handleJoinGame = () => {
    mutation.mutate()
  }

  return (
  <Button variant="contained"
    disabled={disableJoinButton}
    onClick={handleJoinGame}
  >Join game</Button>
  )
}
