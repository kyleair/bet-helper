import React from 'react';
import { Text, Row } from './StyledComponents';

export const Header: React.FC = () => {
    return(
        <Row>
            <Text fontSize="2em">Welcome to bet helper!</Text>
        </Row>
    );
}