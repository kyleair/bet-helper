import React  from 'react';

export const GameDetails: React.FC = () => {

    const getGameProps = () => {

    }

    return(
        <div>
            Game details
            <button onClick={getGameProps}>Click to get props</button>
        </div>
    )
}