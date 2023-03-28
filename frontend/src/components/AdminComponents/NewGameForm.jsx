import { useState } from "react";
import NewGameAreaMap from "./NewGameAreaMap";
import { TextField, FormControl, FormGroup, Alert } from "@mui/material"
import { createGame, updateGame } from "../../api/game";
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

const NewGameForm = ({ updateGameView }) => {

    const [newName, setNewName] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [newMapCoordinates, setNewMapCoordinates] = useState(null)
    const [startTime, setStartTime] = useState("00:00")
    const [endTime, setEndTime] = useState("23:59")
    const [startDate, setStartDate] = useState("2023-01-01")
    const [endDate, setEndDate] = useState("2023-03-15")

    // const { register, handleSubmit, reset } = useForm()

    // const mutation = useMutation(
    //     {
    //         mutationFn: () => createGame().catch((error) => {
    //             console.log(error)
    //         }),
    //         onSuccess: () => {

    //         }

    //     }

    // )

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        console.log(newMapCoordinates)
        if (newMapCoordinates !== null) {
            newMapCoordinates.push({ latitude: newMapCoordinates[0].latitude, longitude: newMapCoordinates[0].longitude })
            createGame({ gameDto: { name: newName, description: newDescription, startDateTime: new Date(startDate + "T" + startTime + "Z"), endDateTime: new Date(endDate + "T" + endTime + "Z") }, mapCoordinateDtos: newMapCoordinates })
            console.log({ gameDto: { name: newName, description: newDescription, startDateTime: new Date(startDate + "T" + startTime + "Z"), endDateTime: new Date(endDate + "T" + endTime + "Z") }, mapCoordinateDtos: newMapCoordinates })
            alert("GAME CREATED!");
            updateGameView()
        } else {
            alert("You need to create a game map by clicking the map")
        }


    };

    const getNewMapCoordinates = (coord) => {
        setNewMapCoordinates(coord)
    }

    return <div>
        <form onSubmit={handleRegisterSubmit}>
            <div className="card p-2" style={{ backgroundColor: '#e9e3d6a3' }}>
                <h3 className="text-center">New game</h3>
                <FormGroup>
                    <FormControl>
                        <label className="m-2">
                            Game name*
                            <input className="form-control" minLength={"2"} required pattern='([A-z0-9À-ž\s]){2,}' value={newName} onChange={(e) => setNewName(e.target.value)} />
                        </label>
                        <label className="m-2">
                            Game description*
                            <input className="form-control" minLength={"10"} required multiline="true" label="Game Description" variant="outlined" pattern="([A-z0-9À-ž\s'!?,.]){2,}" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                        </label>
                        <label className="m-2">
                            Start date*
                            <input type="date" id="start" required className="form-control" name="game-start" onChange={(e) => setStartDate(e.target.value)} value={startDate} min="2023-01-01" max="2025-12-31"></input>
                        </label>

                        <label className="m-2">
                            Start Time*
                            <input className="form-control" required label="Start time" variant="outlined" pattern='^([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        </label>

                        <label className="m-2">
                            End date*
                            <input type="date" id="end" required className="form-control" name="game-end" onChange={(e) => setEndDate(e.target.value)} value={endDate} min="2023-03-15" max="2025-12-31"></input>
                        </label>

                        <label className="m-2">
                            End Time*
                            <input className="form-control" required label="End time" pattern='^([0-1]?[0-9]|2[0-4]):([0-5][0-9])$' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                        </label>
                        <div className="card d-inline-block">
                            <NewGameAreaMap getCoordinates={getNewMapCoordinates}></NewGameAreaMap>
                        </div>
                        <div className="text-center pt-2 pb-1">
                            <button className="btn btn-success" type="submit">Create game</button>
                        </div>

                    </FormControl>
                </FormGroup>
            </div>

        </form>

    </div>


}

export default NewGameForm