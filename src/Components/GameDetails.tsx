import React, { useState }  from 'react';
import axios from 'axios';
import { ODDS_API_KEY } from '../utils';

interface OutcomeType {
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
    const [gameProps, setGameProps] = useState<GameDetailsType | null>(null);

    const getGameProps = async () => {
        const options = {
            method: 'GET',
            url: `https://api.the-odds-api.com/v4/sports/basketball_nba/events/${id}/odds/?`,
            params: {
              apiKey: ODDS_API_KEY,
              regions: 'us',
              markets: 'player_points_rebounds_assists',
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
            <div>Game id: {id}</div>
            Game details
            <button onClick={getGameProps}>Click to get props</button>
            <div>
                {gameProps ? <div>
                {gameProps.bookmakers[0]?.markets[0]?.outcomes.map((outcome) => (
                    <div>
                        {outcome.description} {outcome.name} {outcome.point}: {outcome.price} 
                    </div>
                ))}  </div> : <div>no props available rn</div>
            }
            </div>
        </div>
    )
}