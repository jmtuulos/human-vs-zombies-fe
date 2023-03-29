import { useState } from "react";
import { updatePlayer } from "../../api/player";
import { useMutation } from "@tanstack/react-query"


const PlayerInfo = ({ updatePlayerList, gameId, playerId, data }) => {

    const handleBite = (e) => {
        e.preventDefault()
        data.isHuman = !data.isHuman
        console.log(data)
        updatePlayer(gameId, playerId, data)
            .catch((error) => console.log("Error in changing player state", error))
            .then(alert("Player state has been changed!"), updatePlayerList())
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
                </div></>}



    </>;
}

export default PlayerInfo;