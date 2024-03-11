import React, {useState, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { ODDS_API_KEY } from '../utils';
import { Game } from './Game';
import { Text, Row, Column } from './StyledComponents';
import styled from 'styled-components';

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
   scores: ScoresType[] | null;
}

export enum PropMarkets {
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

export const PropMarketContext = createContext("POINTS");

export const Homepage: React.FC = () => {
    const [currentPropMarket, setCurrentPropMarket] = useState<PropMarkets>(PropMarkets.POINTS);

    const { data: responseData } = useQuery({
        queryKey: ["allGames"],
        queryFn: async (): Promise<GamesResponse[]> => {
           const data = await fetch(`https://api.the-odds-api.com/v4/sports/basketball_nba/scores/?&apiKey=${ODDS_API_KEY}`, {
            method: "GET",
           }).then((res) => res.json());
           return data;
        }
    });

    return(
            <>
                <Row>
                    <Column>
                        <Text>Select a prop market: </Text> 
                    </Column>
                    <DropdownButton title={currentPropMarket}>
                        {Object.values(PropMarkets).map((propMarket) => (
                            <Dropdown.Item onClick={() => setCurrentPropMarket(propMarket)} key={propMarket}>{propMarket}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Row>
                <PropMarketContext.Provider value={currentPropMarket}>
                    <StyledColumn>
                        {responseData?.map((gameData) => (
                        <Game {...gameData} key={gameData.id}/>
                        ))}
                    </StyledColumn>
                </PropMarketContext.Provider>
            </>
    );
}

const StyledColumn = styled(Column)`
    width: 50%;
`;