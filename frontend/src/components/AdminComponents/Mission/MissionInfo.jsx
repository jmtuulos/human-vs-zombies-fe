import { useState, useEffect } from "react";
import Map from "../../Gamedetails/Map";
import MissionInfoMap from "./MissionInfoMap"
import { updateMission } from "../../../api/mission";
import { TextField, Button, FormControlLabel, FormGroup, Checkbox } from "@mui/material";
import MissionAdminMap from "./MissionAdminMap";

const MissionInfo = ({ gameId, data, gameMap }) => {

    const [editState, setEditState] = useState(false)
    const [name, setName] = useState(data.name)
    const [description, setDescription] = useState(data.description)
    const [humanVisible, setHumanVisible] = useState(data.isHumanVisible)
    const [zombieVisible, setZombieVisible] = useState(data.isZombieVisible)
    const [newMissionCoordinates, setNewMissionCoordinates] = useState([])
    const [showMap, setShowMap] = useState(false)
    const marker = ([data.latitude, data.longitude])


    const handleSave = (event) => {
        event.preventDefault();

        const newMissionEmpty = (newMissionCoordinates.latitude !== undefined && newMissionCoordinates.longitude !== undefined)

        const editedMission = {
            "name": name,
            "isHumanVisible": humanVisible,
            "isZombieVisible": zombieVisible,
            "description": description,
            "startTime": data.startTime,
            "endTime": data.endTime,
            "latitude": (newMissionEmpty ? newMissionCoordinates.latitude : data.latitude),
            "longitude": (newMissionEmpty ? newMissionCoordinates.longitude : data.longitude)
        }
        updateMission(gameId, data.id, editedMission)
    }

    const handleHumanCheckBox = () => {
        setHumanVisible(!humanVisible)
    }

    const handleZombieCheckBox = () => {
        setZombieVisible(!zombieVisible)
    }

    const handleEditClick = () => {
        setEditState(!editState)
        setShowMap(false)
    }


    const getNewMissionCoordinates = (coord) => {
        console.log(coord)
        setNewMissionCoordinates(coord)
    }

    const handleShowMap = () => {
        setShowMap(!showMap)
    }

    return <>
        <Button variant="contained" onClick={() => handleEditClick()}>{editState ? "Cancel" : "Edit"}</Button>
        {editState ? <>
            <form onSubmit={handleSave}>
                <TextField id="outlined-basic" label="Mission name" variant="outlined" pattern='([A-z0-9À-ž\s]){2,}' value={name} onChange={(e) => setName(e.target.value)} />
                <TextField id="outlined-basic" multiline label="Mission Description" variant="outlined" pattern='([A-z0-9À-ž\s]){2,}' value={description} onChange={(e) => setDescription(e.target.value)} />
                <label>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox value={humanVisible} onChange={() => handleHumanCheckBox()} defaultChecked />} label="Human visible" />
                        <FormControlLabel control={<Checkbox value={zombieVisible} onChange={() => handleZombieCheckBox()} defaultChecked />} label="Zombie visible" />
                    </FormGroup>
                </label>
                <Button type="submit">Save</Button>
            </form>
            <div>
                <Button onClick={() => handleShowMap()}>{showMap ? "Close map" : "Show map"}</Button>
                {showMap && <MissionAdminMap gameMap={gameMap} getNewMissionCoordinates={getNewMissionCoordinates}></MissionAdminMap>}
            </div>
        </> : <>
            <p>Mission name: {data.name}</p>
            <p>Mission description: {data.description}</p>
            <p>Visible for humans: {data.isHumanVisible ? "True" : "False"}</p>
            <p>Visible for zombies: {data.isZombieVisible ? "True" : "False"}</p>
            {marker[0] !== null || marker[1] !== null ?
                <>  Map position:
                    <Button onClick={() => handleShowMap()}>{showMap ? "Close map" : "Show map"}</Button>
                    {showMap && <MissionInfoMap gameMap={gameMap} marker={marker}></MissionInfoMap>}
                </>

                : <p>This mission does not have map marker</p>}
        </>}

    </>;
}

export default MissionInfo;