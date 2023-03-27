import { useState } from "react";
import { TextField, Button } from "@mui/material";


const GameSettings = ({ gameData }) => {

    const getTime = (date) => {
        if (date.getHours() < 10 && date.getMinutes() < 10)
            return "0" + date.getHours() + ':' + "0" + date.getMinutes();
        if (date.getHours() < 10)
            return "0" + date.getHours() + ':' + date.getMinutes();
        if (date.getMinutes() < 10)
            return date.getHours() + ':' + "0" + date.getMinutes();
    }

    const getDateString = (date) => {
        if (date.getMonth() < 9 && date.getDay() < 10)
            return date.getFullYear() + "-0" + date.getMonth() + "-0" + date.getDay()
        if (date.getMonth() < 9)
            return date.getFullYear() + "-0" + date.getMonth() + "-" + date.getDay()
        if (date.getDay() < 10)
            return date.getFullYear() + "-" + date.getMonth() + "-0" + date.getDay()
    }

    const [name, setName] = useState(gameData.name);
    const [description, setDescription] = useState(gameData.description)
    const [startTime, setStartTime] = useState(getTime(new Date(gameData.startDateTime)))
    const [startDate, setStartDate] = useState(getDateString(new Date(gameData.startDateTime)))
    const [endTime, setEndTime] = useState(getTime(new Date(gameData.endDateTime)))
    const [endDate, setEndDate] = useState(getDateString(new Date(gameData.endDateTime)))
    const [editStart, setEditStart] = useState(false)
    const [editEnd, setEditEnd] = useState(false)

    const handleRuleChange = (e) => {
        e.preventDefault()

        alert("GAME EDITED")
    }

    const handleEditStart = () => {
        setEditStart(!editStart)
    }

    const handleEditEnd = () => {
        setEditEnd(!editEnd)
    }

    return <>
        <form onSubmit={handleRuleChange}>
            <label>Game name:</label>
            <input value={name} onChange={(e) => {
                setName(e.target.value)
            }} pattern='([A-z0-9À-ž\s]){2,}'></input>
            <label>Description</label>
            <input value={description} onChange={(e) => {
                setDescription(e.target.value)
            }} pattern='([A-z0-9À-ž\s]){2,}'></input>
            {editStart ? <> <label>
                Start date:
                <input type="date" id="start" className="form-control" name="game-start" onChange={(e) => setStartDate(e.target.value)} value={startDate} min="2023-03-15" max="2025-12-31"></input>
            </label>
                <TextField id="outlined-basic" label="Start time" variant="outlined" pattern='^([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$' value={startTime} onChange={(e) => setStartTime(e.target.value)} /></>
                :
                <>
                    Start Time: {startDate + " at " + startTime}
                </>}
            <Button onClick={() => handleEditStart()} variant="contained">{editStart ? "Cancel" : "Edit"}</Button>
            {editEnd ? <> <label>
                End date:
                <input type="date" id="end" className="form-control" name="game-end" onChange={(e) => setEndDate(e.target.value)} value={endDate} min="2023-03-15" max="2025-12-31"></input>
            </label>
                <TextField id="outlined-basic" label="End time" variant="outlined" pattern='^([0-1]?[0-9]|2[0-4]):([0-5][0-9])$' value={endTime} onChange={(e) => setEndTime(e.target.value)} /></> : <>
                End Time: {endDate + " at " + endTime}
            </>}
            <Button onClick={() => handleEditEnd()} variant="contained">{editEnd ? "Cancel" : "Edit"}</Button>


            <button type="submit">Save</button>
        </form>
    </>;
}

export default GameSettings;