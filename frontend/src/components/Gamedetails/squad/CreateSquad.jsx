import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { getPlayer } from "../../../api/player"
import { createSquad } from "../../../api/squad"
import { useUser } from "../../../context/UserContext"
import { storageRead, storageSave } from "../../../utils/storage"

export const CreateSquadForm = ({playerId}) => {

  // const { squadname, setSquadName } = useState("")
  const { user, setUser } = useUser()
  const { register, handleSubmit, reset } = useForm()

  const mutation = useMutation(
    { mutationFn: (squadName) =>createSquad(playerId, storageRead('gameId'), squadName)},
    )

  const handleSquadCreate = (data) => {
    mutation.mutate(data.squadname)
    setUser(getPlayer(playerId))
    reset()
  }

  return (
    <div className="card">
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
    </div>
  )
}
