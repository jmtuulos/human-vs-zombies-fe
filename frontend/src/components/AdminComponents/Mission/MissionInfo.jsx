import { useState, useEffect } from "react";
import Map from "../../Gamedetails/Map";
import MissionInfoMap from "./MissionInfoMap"
import { updateMission } from "../../../api/mission";
import { TextField, Button, FormControlLabel, FormControl, FormGroup, Checkbox } from "@mui/material";
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
        <div>
            <div className="d-flex justify-content-between">
                <h5 className="card-title">Mission Info</h5>
                <button className="btn btn-sm btn-primary" variant="contained" onClick={() => handleEditClick()}>{editState ? "Cancel" : "Edit Mission"}</button>
            </div>
            <div className="card mt-3 p-1 bg-light">
                {editState ? <>
                    <form onSubmit={handleSave}>
                        <FormGroup>
                            <FormControl>
                                <label className=" m-2" >
                                    Mission name*
                                    <input className="form-control" required minLength={"2"} maxLength={"50"} pattern='([A-z0-9À-ž\s]){2,}' value={name} onChange={(e) => setName(e.target.value)} />
                                </label>
                                <label className="m-2">
                                    Mission description*
                                    <input className="form-control" required multiline="true" minLength={"2"} maxLength={"200"} pattern='([A-z0-9À-ž\s]){2,}' value={description} onChange={(e) => setDescription(e.target.value)} />
                                </label>
                                <label>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox value={humanVisible} onChange={() => handleHumanCheckBox()} defaultChecked />} label="Human visible" />
                                        <FormControlLabel control={<Checkbox value={zombieVisible} onChange={() => handleZombieCheckBox()} defaultChecked />} label="Zombie visible" />
                                    </FormGroup>
                                </label>
                                <div>
                                    <Button onClick={() => handleShowMap()}>{showMap ? "Close map" : "Show map"}</Button>
                                    {showMap && <MissionAdminMap currentMarker={{ longitude: data.longitude, latitude: data.latitude }} gameMap={gameMap} getNewMissionCoordinates={getNewMissionCoordinates}></MissionAdminMap>}
                                </div>
                                <div className="text-center p-2">
                                    <Button type="submit" variant="contained">Save mission</Button>
                                </div>

                            </FormControl>
                        </FormGroup>

                    </form>

                </> : <>
                    <div className="p-2">
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
                    </div>
                </>}
            </div>
        </div>
    </>;
}

export default MissionInfo;