import MissionAdminMap from "./MissionAdminMap";
import { Checkbox, FormGroup, FormControlLabel, TextField } from "@mui/material"
import { useState } from "react";
import { createMission } from "../../../api/mission";

const MissionForm = ({ gameMap, gameId }) => {


    const [newName, setNewName] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [startTime, setStartTime] = useState("00:00")
    const [endTime, setEndTime] = useState("23:59")
    const [startDate, setStartDate] = useState("2023-01-01")
    const [endDate, setEndDate] = useState("2023-03-15")
    const [humanVisible, setHumanVisible] = useState(true)
    const [zombieVisible, setZombieVisible] = useState(true)
    const [newMissionCoordinates, setNewMissionCoordinates] = useState([])


    const getNewMissionCoordinates = (coord) => {
        setNewMissionCoordinates(coord)
    }

    const handleNewMissionSubmit = (event) => {
        event.preventDefault();
        createMission(gameId, {
            "name": newName,
            "isHumanVisible": humanVisible,
            "isZombieVisible": zombieVisible,
            "description": newDescription,
            "startTime": new Date(startDate + "T" + startTime + "Z"),
            "endTime": new Date(endDate + "T" + endTime + "Z"),
            "latitude": newMissionCoordinates.latitude,
            "longitude": newMissionCoordinates.longitude
        })
        console.log({
            "name": newName,
            "isHumanVisible": humanVisible,
            "isZombieVisible": zombieVisible,
            "description": newDescription,
            "startTime": new Date(startDate + "T" + startTime + "Z"),
            "endTime": new Date(endDate + "T" + endTime + "Z"),
            "latitude": newMissionCoordinates.latitude,
            "longitude": newMissionCoordinates.longitude
        }
        )
        alert("mission created")
    }

    const handleHumanCheckBox = () => {
        setHumanVisible(!humanVisible)
        console.log(humanVisible)
    }

    const handleZombieCheckBox = () => {
        setZombieVisible(!zombieVisible)
    }



    return <>
        <h5 className="text-center" >New mission</h5>
        <form onSubmit={handleNewMissionSubmit}>
            <div>
                <fieldset >
                    <TextField id="outlined-basic" label="Mission name" variant="outlined" pattern='([A-z0-9À-ž\s]){2,}' value={newName} onChange={(e) => setNewName(e.target.value)} />
                    <TextField id="outlined-basic" multiline label="Mission Description" variant="outlined" pattern='([A-z0-9À-ž\s]){2,}' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                    <label>
                        Start date:
                        <input type="date" id="start" className="form-control" name="mission-start" onChange={(e) => setStartDate(e.target.value)} value={startDate} min="2023-01-01" max="2025-12-31"></input>
                    </label>

                    <TextField id="outlined-basic" label="Start time" variant="outlined" pattern='^([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$' value={startTime} onChange={(e) => setStartTime(e.target.value)} />

                    <label>
                        End date:
                        <input type="date" id="end" className="form-control" name="mission-end" onChange={(e) => setEndDate(e.target.value)} value={endDate} min="2023-03-15" max="2025-12-31"></input>
                    </label>
                    <TextField id="outlined-basic" label="End time" variant="outlined" pattern='^([0-1]?[0-9]|2[0-4]):([0-5][0-9])$' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    <label>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox value={humanVisible} onChange={() => handleHumanCheckBox()} defaultChecked />} label="Human visible" />
                            <FormControlLabel control={<Checkbox value={zombieVisible} onChange={() => handleZombieCheckBox()} defaultChecked />} label="Zombie visible" />
                        </FormGroup>
                    </label>
                    <button type="submit">Create</button>
                </fieldset>
            </div>
        </form>
        <div className="card h-50 w-50 d-inline-block">
            <MissionAdminMap getNewMissionCoordinates={getNewMissionCoordinates} gameMap={gameMap}></MissionAdminMap>
        </div>
    </>;
}

export default MissionForm;