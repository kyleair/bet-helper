import React, {useState} from 'react';
import axios from 'axios';

import { ODDS_API_KEY } from '../utils';
import { Game } from './Game';

interface ScoresType {
    name: string; // name of team who got below score.
    score: string; // number as a string
}

export interface GamesResponse {
   id: string;
   sport_key: string;
   sport_title: string;
   commence_time: string;
   completed: boolean;
   home_team: string;
   away_team: string;
   scores: ScoresType[];
}

export const Homepage: React.FC = () => {
    const [responseData, setResponseData] = useState<GamesResponse[]>();

    const onFetchDataClick = async () => {
        const options = {
            method: 'GET',
            url: 'https://api.the-odds-api.com/v4/sports/basketball_nba/scores/?',
            params: {
              apiKey: ODDS_API_KEY,
            },
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
              setResponseData(response.data);
          } catch (error) {
              console.error(error);
          }
    }

    return(
        <div>
            <button onClick={onFetchDataClick}>fetch data</button>
            <div style={{marginTop: "16px"}}>
                {responseData?.map((gameData) => (
                   <Game {...gameData}/>
                ))}
            </div>
        </div>
    );
}