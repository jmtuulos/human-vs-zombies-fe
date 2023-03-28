import { useState } from "react";
import NewGameAreaMap from "./NewGameAreaMap";
import { TextField, FormControl, FormGroup } from "@mui/material"
import { createGame } from "../../api/game";

const NewGameForm = () => {

    const [newName, setNewName] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [newMapCoordinates, setNewMapCoordinates] = useState([])
    const [startTime, setStartTime] = useState("00:00")
    const [endTime, setEndTime] = useState("23:59")
    const [startDate, setStartDate] = useState("2023-01-01")
    const [endDate, setEndDate] = useState("2023-03-15")


    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        newMapCoordinates.push({ latitude: newMapCoordinates[0].latitude, longitude: newMapCoordinates[0].longitude })
        createGame({ gameDto: { name: newName, description: newDescription, startDateTime: new Date(startDate + "T" + startTime + "Z"), endDateTime: new Date(endDate + "T" + endTime + "Z") }, mapCoordinateDtos: newMapCoordinates })
        console.log({ gameDto: { name: newName, description: newDescription, startDateTime: new Date(startDate + "T" + startTime + "Z"), endDateTime: new Date(endDate + "T" + endTime + "Z") }, mapCoordinateDtos: newMapCoordinates })
        alert("GAME CREATED!");
    };

    const getNewMapCoordinates = (coord) => {
        setNewMapCoordinates(coord)
    }

    return <div>
        <form onSubmit={handleRegisterSubmit}>
            <div className="card p-2">
                <h3 className="text-center">New game</h3>
                <FormGroup>
                    <FormControl>
                        <TextField className="bg-white m-2" id="outlined-basic" label="Game name" variant="outlined" pattern='([A-z0-9À-ž\s]){2,}' value={newName} onChange={(e) => setNewName(e.target.value)} />
                        <TextField className="bg-white m-2" id="outlined-basic" multiline label="Game Description" variant="outlined" pattern='([A-z0-9À-ž\s]){2,}' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                        <label className="bg-white m-2">
                            Start date:
                            <input type="date" id="start" className="form-control" name="game-start" onChange={(e) => setStartDate(e.target.value)} value={startDate} min="2023-01-01" max="2025-12-31"></input>
                        </label>

                        <TextField className="bg-white m-2" id="outlined-basic" label="Start time" variant="outlined" pattern='^([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$' value={startTime} onChange={(e) => setStartTime(e.target.value)} />

                        <label className="bg-white m-2">
                            End date:
                            <input type="date" id="end" className="form-control" name="game-end" onChange={(e) => setEndDate(e.target.value)} value={endDate} min="2023-03-15" max="2025-12-31"></input>
                        </label>
                        <TextField className="bg-white m-2" id="outlined-basic" label="End time" variant="outlined" pattern='^([0-1]?[0-9]|2[0-4]):([0-5][0-9])$' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                        <div className="card d-inline-block">
                            <NewGameAreaMap getCoordinates={getNewMapCoordinates}></NewGameAreaMap>
                        </div>
                        <div className="text-center pt-2 pb-1">
                            <button className="btn btn-success" type="submit">Create</button>
                        </div>

                    </FormControl>
                </FormGroup>
            </div>

        </form>

    </div>


}

export default NewGameForm