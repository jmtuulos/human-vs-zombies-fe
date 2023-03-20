import { Button, TextField } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { createSquadChatMessage } from "../../../api/squad"
import { storageRead } from "../../../utils/storage"

export const SquadForm = () => {

  // const [chatMsg, setSquadChat] = useState()
  const { register, handleSubmit, reset } = useForm()
  const bottomRef = useRef(null)

  const mutation = useMutation(
    { mutationFn: (chatMsg) => createSquadChatMessage(storageRead('gameId'), 1, chatMsg)},
  )

  const handleSubmitSquad = (data) => {
    // setSquadChat(data.chatMsg)
    mutation.mutate(data.chatMsg) // Needs implementation to check if player is human or zombie
    reset()
  }

  return (
  <form onSubmit={handleSubmit(handleSubmitSquad)}>
    <TextField required {...register("chatMsg")}
    id="filled-basic"
    label="Enter your message"
    variant="filled"
    helperText="Remember to follow the rules" />
    <Button type="submit"
      size="large"
      variant="contained"
      onSubmit={handleSubmit(handleSubmitSquad)}
      color="primary">Send</Button>
  </form>
  )
}
