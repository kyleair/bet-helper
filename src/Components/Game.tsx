import React, {useState} from 'react';
import { GamesResponse } from './Homepage';
import { GameDetails } from './GameDetails';


export const Game: React.FC<GamesResponse> = ({home_team, away_team, id}) => {
    const [openGame, setOpenGame] = useState(false);
    return(
        <div style={{marginTop: "16px"}} >
            {away_team} vs {home_team}
            <button onClick={() => setOpenGame(!openGame)}>Open/Close</button>
            {
                openGame ? <GameDetails id={id}/> : null
            }
        </div>
    );
}