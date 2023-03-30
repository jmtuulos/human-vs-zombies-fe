import { useState } from "react";
import { updatePlayer } from "../../api/player";
import { useMutation } from "@tanstack/react-query"
import { Alert } from "@mui/material";

const PlayerInfo = ({ updatePlayerList, gameId, playerId, data }) => {

    const [showError, setShowError] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const { mutate } = useMutation({
        mutationFn: (playerData) => updatePlayer(gameId, playerId, playerData),
        onError: (error) => {
            console.log("Error in changing player state", error)
        },
        onSuccess: () => {
            alert("Player state has been changed!")
            updatePlayerList()
        }
    })

    const handleBite = (e) => {
        e.preventDefault()
        data.isHuman = !data.isHuman
        mutate(data)
    }

    return <>
        <p>Player name: {data.fullName}</p>
        {data.isHuman ?
            <div>
                <p>Player is currently: HUMAN</p>
                <button onClick={(e) => handleBite(e)} className="btn btn-primary">Change player state</button>
            </div>
            : <>
                <div>
                    <p>Player is currently: ZOMBIE</p>
                    <button onClick={(e) => handleBite(e)} className="btn btn-primary">Change player state</button>
                    <div className="text-center d-flex justify-content-center">
                        <div className="w-75 text-center">
                            {showSuccess && <Alert severity="success" onClose={() => { setShowSuccess(false) }}>Game edited!</Alert>}
                            {showError && <Alert severity="error" onClose={() => { setShowError(false) }}>Something went wrong in editing game. Try again.</Alert>}
                        </div>
                    </div>
                </div></>}
    </>;
}

export default PlayerInfo;