import { Paper } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { getPlayer } from "../../../api/player"
import { createSquad, getAllSquads } from "../../../api/squad"
import { getAllPlayersByUuid } from "../../../api/user"
import { useUser } from "../../../context/UserContext"
import { storageRead, storageSave } from "../../../utils/storage"

export const CreateSquadForm = () => {

  const { user, setUser } = useUser()
  const { register, handleSubmit, reset } = useForm()

  const mutation = useMutation(
    { mutationFn: (squadName) => createSquad(storageRead('gameId'), squadName),
     onSuccess: () => {
      getPlayer(user.playerId).then((data) => {
        console.log(data)
        setUser({...user, squadId: data.squadId})
     }).catch( (error) =>
      console.log("error", error)
     )
    }
    })

  const handleSquadCreate = (data) => {
    mutation.mutate(data.squadname)
    reset()
  }

  return (
  <>
    {mutation.isLoading && <p>Creating squad...</p>}
    {mutation.isError && <p>Error creating squad</p>}
    {user.squadId == null &&
    <Paper sx={{paddingBlock: 3, maxWidth: 0.5, backgroundColor: '#e9e3d6'}}>
        <div className="card-body">
          <h5 className="card-title">Create a squad</h5>
          <form onSubmit={ handleSubmit(handleSquadCreate) }>
            <input {...register("squadname") } type="text" placeholder="Name your squad"/>
            <div className="mt-2">
                <input
              className="arrow-button1"
              type="image"
              src="/images/arrow.svg" alt="arrow image"
              style={{ width: "40px" }}/>
            </div>
          </form>
        </div>
    </Paper>}
  </>
  )
}
