import { Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { getPlayer } from "../../../api/player"
import { joinSquad } from "../../../api/squad"
import { useUser } from "../../../context/UserContext"
import { storageRead } from "../../../utils/storage"

export const SquadItem = ({ squad, gameId }) => {

  const { user, setUser } = useUser()
  const squadId = squad.squadMembers[0].squadId

  const mutation = useMutation(
    { mutationFn: () => joinSquad(gameId, squadId, user),
  })

  const handleClick = () => {
    mutation.mutate()
    setUser(getPlayer(storageRead('userId')))
  }
    //add membercount and list of deceiced members to the squd details line
  return (
      <li className="list-group-item">
        <h4>{squad.name}</h4>
        <Button variant="contained"
          color="success"
          onClick={handleClick}
        >
          join
        </Button>
      </li>
  )
}
