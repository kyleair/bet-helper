import React, {useState} from 'react';
import { GamesResponse } from './Homepage';
import { GameDetails } from './GameDetails';


export const Game: React.FC<GamesResponse> = ({teams}) => {
    const [openGame, setOpenGame] = useState(false);
    return(
        <div style={{marginTop: "16px"}} >
            {teams.home.name} vs {teams.away.name}
            <button onClick={() => setOpenGame(!openGame)}>Open/Close</button>
            {
                openGame ? <GameDetails /> : null
            }
        </div>
    );
}