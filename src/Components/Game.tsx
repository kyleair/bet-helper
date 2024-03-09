import React, {useMemo, useState, useContext, useEffect } from 'react';
import { GamesResponse } from './Homepage';
import { GameDetails } from './GameDetails';
import { Text, Column, Row } from './StyledComponents';
import Accordion from 'react-bootstrap/Accordion';
import styled from 'styled-components';
import { format } from 'date-fns';
import { ODDS_API_KEY } from '../utils';
import { PropMarketContext } from './Homepage';
import axios from 'axios';


export const Game: React.FC<GamesResponse> = ({home_team, away_team, id, commence_time}) => {
    const market = useContext(PropMarketContext);
    const memoMarket = useMemo(() => market, [market]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const memoId = useMemo(() => id, [id]);
    const date = new Date(commence_time);
    const [gameData, setGameData] = useState();

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://api.the-odds-api.com/v4/sports/basketball_nba/events/${memoId}/odds`,
            params: {
                apiKey: ODDS_API_KEY,
                regions: "us",
                markets: memoMarket,
                oddsFormat: "american",
            },
            }; 
            if (isOpen && memoId && memoMarket && !gameData) {
                try {
                    axios.request(options).then((res) =>setGameData(res.data));
                    } catch (e) {

                    }  
            }
    }, [isOpen, memoId])

    return(
        <GameColumn>
            <Accordion>
                <Accordion.Item eventKey={home_team} onClick={() => setIsOpen(!isOpen)}>
                    <Accordion.Header>
                        <HeaderRow>
                            <Text>{away_team} vs {home_team}</Text>
                            <Text>{format(date, "EEE MMM do, h:mm a")}</Text>
                        </HeaderRow>
                    </Accordion.Header>
                    <Accordion.Body>
                        <GameDetails id={memoId} isOpen={isOpen} gameData={gameData}/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </GameColumn>
    );
}

const GameColumn = styled(Column)`
    width: 100%;
    border-bottom: solid #bbb 1px;
`;

const HeaderRow = styled(Row)`
    width: 100%;
    justify-content: space-between;
`;