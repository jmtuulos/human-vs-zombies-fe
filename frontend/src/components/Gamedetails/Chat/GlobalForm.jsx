import { Button, TextField } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { createChatMessage } from "../../../api/game"
import { storageRead } from "../../../utils/storage"

export const GlobalForm = () => {
  const { register, handleSubmit, reset } = useForm()

  const mutation = useMutation(
    { mutationFn: (variables) => createChatMessage(storageRead('gameId'), variables[0], variables[1], variables[2]) },
  )

  const handleSubmitGlobal = (data) => {
    console.log("data ->", data)
    mutation.mutate([data.chatMsg, true, true])
    reset()
  }

  return (
  <form onSubmit={handleSubmit(handleSubmitGlobal)}>
    <TextField fullWidth={true} required
      {...register("chatMsg")}
      id="filled-basic"
      label="Enter your message"
      variant="filled"
      helperText="Remember to follow the guidelines" />
    <Button  variant="contained"
      style={{ marginLeft: "10px" }}
      size="large"
      type="submit"
      onSubmit={handleSubmit(handleSubmitGlobal)}
      color="primary">Send
    </Button>
  </form>
  )
}
