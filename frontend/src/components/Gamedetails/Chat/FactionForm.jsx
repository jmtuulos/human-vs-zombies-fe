import { Button, TextField } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { createChatMessage } from "../../../api/game"
import { useUser } from "../../../context/UserContext"
import { storageRead } from "../../../utils/storage"

export const FactionForm = () => {

  const { register, handleSubmit, reset } = useForm()
  const { user } = useUser()

  const mutation = useMutation(
    { mutationFn: (variables) => createChatMessage(storageRead('gameId'), variables[0], variables[1], variables[2]) },
  )

  const handleSubmitFaction = (data) => {
    mutation.mutate([data.chatMsg, user.isHuman, !user.isHuman])
    reset()
  }

  return (
  <form onSubmit={handleSubmit(handleSubmitFaction)}>
    <fieldset >
      <TextField required {...register("chatMsg")} id="filled-basic" label="Enter your message" variant="filled" helperText="Remember to follow the rules" />
      <Button variant="contained"
        style={{ marginLeft: "10px" }}
        size="large"
        onSubmit={handleSubmit(handleSubmitFaction)}
        type="submit"
        color="primary">Send
      </Button>
    </fieldset>
  </form>
  )
}
