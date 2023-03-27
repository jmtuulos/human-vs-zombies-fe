import { Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { getPlayer } from "../../../api/player"
import { joinSquad } from "../../../api/squad"
import { useUser } from "../../../context/UserContext"
import { storageRead } from "../../../utils/storage"

export const SquadItem = ({ squad, gameId }) => {

  const { user, setUser } = useUser()
  console.log(squad)
  const mutation = useMutation(
    { mutationFn: () => joinSquad( squad.id),
    onSuccess: () => {
      setUser({...user, squadId: squad.id})
    }
  })

  const handleClick = () => {
    mutation.mutate()
  }

  return (
    <>
      <li className="list-group-item">
        <h4>{squad.name}</h4>
        <p>members: {squad.squadMembers.length}</p>
        <Button variant="contained"
          color="success"
          onClick={handleClick}
        >
          join
        </Button>
      </li>
    </>
  )
}
