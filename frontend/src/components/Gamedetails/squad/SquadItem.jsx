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
    { mutationFn: () => joinSquad(storageRead('userId'), squadId),
  })

  const handleClick = () => {
    mutation.mutate()
    if (mutation.isSuccess)
      setUser(getPlayer(storageRead('userId')))
    if (mutation.isError)
      console.log("error joining squad", mutation.error)
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
