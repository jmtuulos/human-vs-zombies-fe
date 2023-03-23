import { useState } from "react";
import Map from "../../Gamedetails/Map";
import MissionInfoMap from "./MissionInfoMap"
import { updateMission } from "../../../api/mission";
import { TextField, Button, FormControlLabel, FormGroup, Checkbox } from "@mui/material";

const MissionInfo = ({ gameId, data, gameMap }) => {

    const [editState, setEditState] = useState(false)
    const [name, setName] = useState(data.name)
    const [description, setDescription] = useState(data.description)
    const [humanVisible, setHumanVisible] = useState(data.isHumanVisible)
    const [zombieVisible, setZombieVisible] = useState(data.isZombieVisible)

    const marker = [data.latitude, data.longitude]


    const handleSave = (event) => {
        event.preventDefault();
        const editedMission = {
            "name": name,
            "isHumanVisible": humanVisible,
            "isZombieVisible": zombieVisible,
            "description": description,
            "startTime": data.startTime,
            "endTime": data.endTime,
            "latitude": data.latitude,
            "longitude": data.longitude
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

        </> : <>


            <p>Mission name: {data.name}</p>
            <p>Mission description: {data.description}</p>
            <p>Visible for humans: {data.isHumanVisible ? "True" : "False"}</p>
            <p>Visible for zombies: {data.isZombieVisible ? "True" : "False"}</p>
            <MissionInfoMap gameMap={gameMap} marker={marker}></MissionInfoMap></>}

    </>;
}

export default MissionInfo;