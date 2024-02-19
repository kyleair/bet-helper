import React, {useState, createContext} from 'react';
import axios from 'axios';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { ODDS_API_KEY } from '../utils';
import { Game } from './Game';
import { Button } from './StyledComponents';

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

enum PropMarket {
    POINTS = 'player_points',
    REBOUNDS = 'player_rebounds',
    ASSISTS = 'player_assists',
    THREES = 'player_threes',
    BLOCKS = 'player_blocks',
    STEALS = 'player_steals',
    BLOCKS_STEALS = 'player_blocks_steals',
    TURNOVERS = 'player_turnovers',
    POINTS_REBOUNDS_ASSISTS = 'player_points_rebounds_assists',
    POINTS_REBOUNDS = 'player_points_rebounds',
    POINTS_ASSISTS = 'player_points_assists',
    REBOUNDS_ASSISTS = 'player_rebounds_assists',
    FIRST_BASKET = 'player_first_basket',
    DOUBLE_DOUBLE = 'player_double_double',
    TRIPLE_DOUBLE = 'player_triple_double',
}

export const PropMarketContext = createContext(PropMarket.POINTS);

export const Homepage: React.FC = () => {
    const [responseData, setResponseData] = useState<GamesResponse[]>();
    const [propMarket, setPropMarket] = useState<PropMarket>(PropMarket.POINTS);

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
        <PropMarketContext.Provider value={propMarket}>
            <DropdownButton title={propMarket}>
                <Dropdown.Item onClick={() => setPropMarket(PropMarket.ASSISTS)}>{PropMarket.ASSISTS}</Dropdown.Item>
                <Dropdown.Item onClick={() => setPropMarket(PropMarket.BLOCKS)}>{PropMarket.BLOCKS}</Dropdown.Item>
            </DropdownButton>
            <Button $secondary onClick={onFetchDataClick}>Fetch data</Button>
            <div style={{marginTop: "16px"}}>
                {responseData?.map((gameData) => (
                   <Game {...gameData}/>
                ))}
            </div>
        </PropMarketContext.Provider>
    );
}