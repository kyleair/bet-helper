import React, {useState} from 'react';
import { GamesResponse } from './Homepage';
import { GameDetails } from './GameDetails';
import { Text, Button } from './StyledComponents';


export const Game: React.FC<GamesResponse> = ({home_team, away_team, id}) => {
    const [openGame, setOpenGame] = useState(false);
    return(
        <div style={{marginTop: "16px"}} >
            <Text>{away_team} vs {home_team}</Text>
            <Button onClick={() => setOpenGame(!openGame)}>Open/Close</Button>
            {
                openGame ? <GameDetails id={id}/> : null
            }
        </div>
    );
}