import React, { useState, useMemo, createContext, useEffect, useContext }  from 'react';
import axios from 'axios';
import { TeamNameToID, RapidAPIKey, RapidAPIHost_API_NBA } from '../utils';
import { PropMarketContext } from './Homepage';
import { GamePropsDisplay } from './GamePropsDisplay';
import { Text, Column, Row } from './StyledComponents';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import styled from 'styled-components';

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

export interface GameDetailsType {
    id: string;
    sport_key: string;
    sport_title: string;
    commence_time: string;
    home_team: string;
    away_team: string;
    bookmakers: BookmakerType[];
}

export const BookmakerContext = createContext("Sportsbook");

export const GameDetails: React.FC<{id: string, isOpen: boolean, gameData?: GameDetailsType}> = ({id, isOpen, gameData}) => {
    const market = useContext(PropMarketContext);
    const [currentBookmaker, setCurrentBookmaker] = useState<BookmakerType | null>(null);

    const homeTeamId = useMemo(() => TeamNameToID[gameData?.home_team as keyof typeof TeamNameToID], [id, gameData]);
    const awayTeamId = useMemo(() => TeamNameToID[gameData?.away_team as keyof typeof TeamNameToID], [id, gameData]);
    const [homeTeamData, setHomeTeamData] = useState();
    const [awayTeamData, setAwayTeamData] = useState();
    useEffect(() => {
        const options = {
                    method: 'GET',
                    url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
                    params: {
                      team: homeTeamId,
                      season: '2023'
                    },
                    headers: {
                      'X-RapidAPI-Key': RapidAPIKey,
                      'X-RapidAPI-Host': RapidAPIHost_API_NBA
                    }
                  };
                  if (isOpen && !!homeTeamId )
                  try {
                      axios.request(options).then((res) =>setHomeTeamData(res.data.response));
                
                     } catch (e) {

                     }
                    }, [market])
                   

    useEffect(() => {
        const options = {
                    method: 'GET',
                    url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
                    params: {
                        team: awayTeamId,
                        season: '2023'
                    },
                    headers: {
                        'X-RapidAPI-Key': RapidAPIKey,
                        'X-RapidAPI-Host': RapidAPIHost_API_NBA
                    }
                    };
                    
                    if (isOpen && !!awayTeamId)
                    try {
                        axios.request(options).then((res) =>setAwayTeamData(res.data.response));  
                        } catch (e) {

                        }
                    }, [market])


    // const outcomes = useMemo(() => currentBookmaker?.markets[0]?.outcomes, [market, currentBookmaker]);
    return(
        <div>
            <div>
                {gameData?.bookmakers && gameData.bookmakers.length > 0 ? 
                    <Column>
                        <BookmakerContext.Provider value={currentBookmaker?.title ?? "Sportsbook"}>
                        <DropdownButton title={currentBookmaker?.title ?? "Sportsbook"}>
                            {gameData.bookmakers.map((bookmaker, index) => (
                                <Dropdown.Item onClick={() => setCurrentBookmaker(bookmaker)} key={`${bookmaker.key}-${index}`}>{bookmaker.title}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                        {
                            currentBookmaker?.markets[0]?.outcomes.map((outcome, index) => (
                            <GamePropRow key={`${outcome.description}-${outcome.name}-${index}`}>
                                <GamePropsDisplay {...outcome} homeTeamData={homeTeamData} awayTeamData={awayTeamData}/> 
                            </GamePropRow>                                                      
                            ))
                        } 
                        </BookmakerContext.Provider>
                    </Column> 
                : <Text fontSize="1.3em">No data for this game</Text>
            }
            </div>
        </div>
    )
}

const GamePropRow = styled(Row)`
    border-bottom: solid #bbb 1px;
    width: 100%;
`;