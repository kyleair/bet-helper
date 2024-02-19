import React, {useState} from 'react';
import { GamesResponse } from './Homepage';
import { GameDetails } from './GameDetails';
import { Text, Button, Row, Column } from './StyledComponents';
import Accordion from 'react-bootstrap/Accordion';
import styled from 'styled-components';


export const Game: React.FC<GamesResponse> = ({home_team, away_team, id}) => {
    const [openGame, setOpenGame] = useState(false);
    return(
        <GameColumn>
            <Accordion>
                <Accordion.Item eventKey={id}>
                    <Accordion.Header>
                        <Text>{away_team} vs {home_team}</Text>
                    </Accordion.Header>
                    <Accordion.Body>
                        <GameDetails id={id}/>
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
            {/* <Row>
                <Text>{away_team} vs {home_team}</Text>
                <Button onClick={() => setOpenGame(!openGame)}>Open/Close</Button>
            </Row>
            {
                openGame ? <GameDetails id={id}/> : null
            } */}
        </GameColumn>
    );
}

const GameColumn = styled(Column)`
    width: 100%;
    border-bottom: solid #bbb 1px;
`;