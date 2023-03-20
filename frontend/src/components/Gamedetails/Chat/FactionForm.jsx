import { Button, TextField } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { createChatMessage } from "../../../api/game"
import { storageRead } from "../../../utils/storage"

export const FactionForm = () => {

  // const [chatMsg, setFactionChat] = useState()
  const { register, handleSubmit, reset } = useForm()

  const mutation = useMutation(
    { mutationFn: (variables) => createChatMessage(storageRead('gameId'), variables[0], variables[1], variables[2]) },
  )

  const handleSubmitFaction = (data) => {
    // setFactionChat(data.chatMsg)
    mutation.mutate([data.chatMsg, false, false]) // Needs implementation to check if player is human or zombie
    reset()
  }

  return (
  <form onSubmit={handleSubmit(handleSubmitFaction)}>
    <TextField required {...register("chatMsg")} id="filled-basic" label="Enter your message" variant="filled" helperText="Remember to follow the rules" />
    <Button variant="contained" onSubmit={handleSubmit(handleSubmitFaction)} color="primary">Send</Button>
  </form>
  )
}
