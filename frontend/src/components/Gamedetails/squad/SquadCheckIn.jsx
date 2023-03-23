import { Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { postSquadCheckIn } from "../../../api/squad"
import { useUser } from "../../../context/UserContext"

export const SquadCheckIn = ({squadId, gameId}) =>
{
  let checkInPosition = {
    "latitude": 0,
    "longitude": 0
  }
  const { user } = useUser()

  const mutation = useMutation(
    { mutationFn: () => postSquadCheckIn(gameId, squadId, checkInPosition),
    onSuccess: () => {
      window.alert("checked in")
    },
    onError: () => {
      window.alert("Already checked in")
    }
  })

  const handleCheckIn = () => {

    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        checkInPosition = position
      })
    }
    mutation.mutate()
  }
  return (
    <Button variant="contained" color="success" onClick={handleCheckIn}>Check in</Button>
  )
}
