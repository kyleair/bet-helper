import React, { useState } from "react";
import axios from 'axios';
import { RapidAPIKey, RapidAPIHost_API_NBA, TeamNameToID } from "../utils";
import { OutcomeType } from "./GameDetails";

export const GamePropsDisplay: React.FC<OutcomeType & { homeTeamName: keyof typeof TeamNameToID; awayTeamName: keyof typeof TeamNameToID; }> = ({description, point, price, name, homeTeamName, awayTeamName}) => {
    const [recentGamesData, setRecentGamesData] = useState();

    const getRecentGamesData = async () => {
        const options = {
            method: 'GET',
            url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
            params: {
              team: TeamNameToID[homeTeamName],
              season: '2023'
            },
            headers: {
              'X-RapidAPI-Key': RapidAPIKey,
              'X-RapidAPI-Host': RapidAPIHost_API_NBA
            }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data.response.filter((gameStats: any) => `${gameStats.player.firstname} ${gameStats.player.lastname}` === description));
              setRecentGamesData(response.data.response.filter((gameStats: any) => `${gameStats.player.firstname} ${gameStats.player.lastname}` === description));
          } catch (error) {
              console.error(error);
          }
    };

    return (
        <div>
            {description} {name} {point}: {price}  <button onClick={getRecentGamesData}>View trends</button>
        </div>
    );
}