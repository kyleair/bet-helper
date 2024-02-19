import React, { useState, useContext }  from 'react';
import axios from 'axios';
import { ODDS_API_KEY, TeamNameToID } from '../utils';

import { GamePropsDisplay } from './GamePropsDisplay';
import { Text, Button } from './StyledComponents';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { PropMarketContext } from './Homepage';

export interface OutcomeType {
    name: string;
    description: string;
    price: number;
    point: number;
}

interface MarketType {
    key: string;
    last_update: string;
    outcomes: OutcomeType[]
}

interface BookmakerType {
    key: string;
    title: string;
    markets: MarketType[];
}

interface GameDetailsType {
    id: string;
    sport_key: string;
    sport_title: string;
    commence_time: string;
    home_team: string;
    away_team: string;
    bookmakers: BookmakerType[];
}

export const GameDetails: React.FC<{id: string}> = ({id}) => {
    const market = useContext(PropMarketContext);
    const [gameProps, setGameProps] = useState<GameDetailsType | null>(null);
    const [currentBookmaker, setCurrentBookmaker] = useState<BookmakerType | null>(null);

    const getGameProps = async () => {
        const options = {
            method: 'GET',
            url: `https://api.the-odds-api.com/v4/sports/basketball_nba/events/${id}/odds/?`,
            params: {
              apiKey: ODDS_API_KEY,
              regions: 'us',
              markets: market,
              oddsFormat: 'american'
            },
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
              setGameProps(response.data);
          } catch (error) {
              console.error(error);
          }
    }

    return(
        <div>
            <Button onClick={getGameProps}>Fetch game data</Button>
            <div>
                {gameProps ? 
                    <div>
                        <DropdownButton title={currentBookmaker?.title ?? "Sportsbook"}>
                            {gameProps.bookmakers.map((bookmaker) => (
                                <Dropdown.Item onClick={() => setCurrentBookmaker(bookmaker)}>{bookmaker.title}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                        {
                            currentBookmaker?.markets[0]?.outcomes.map((outcome) => (
                            <div>
                                <GamePropsDisplay {...outcome} homeTeamName={gameProps.home_team as keyof typeof TeamNameToID} awayTeamName={gameProps.away_team as keyof typeof TeamNameToID}/> 
                            </div>
                            ))
                        } 
                    </div> 
                : <Text fontSize="1.3em">No data here yet</Text>
            }
            </div>
        </div>
    )
}