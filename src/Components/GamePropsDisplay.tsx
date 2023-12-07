import React, { useState } from "react";
import axios from 'axios';
import { RapidAPIKey, RapidAPIHost_API_NBA, TeamNameToID } from "../utils";
import { OutcomeType } from "./GameDetails";

interface PlayerStatsType {
    assissts: number;
    blocks: number;
    defReb: number;
    fga: number;
    fgm: number;
    fgp: string;
    fta: number;
    ftm: number;
    ftp: string;
    game: {
        id: number;
    }
    min: string;
    offReb: number;
    pFouls: number;
    player: {
        firstname: string;
        id: number;
        lastname: string;
    }
    plusMinus: string;
    points: number;
    pos: string;
    steals: number;
    team: any;
    totReb: number;
    tpa: number;
    tpm: number;
    tpp: string;
    turnovers: number;
}

export const GamePropsDisplay: React.FC<OutcomeType & { homeTeamName: keyof typeof TeamNameToID; awayTeamName: keyof typeof TeamNameToID; }> = ({description, point, price, name, homeTeamName, awayTeamName}) => {
    const [recentGamesData, setRecentGamesData] = useState<PlayerStatsType[]>([]);

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

          const awayOptions = {
            method: 'GET',
            url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
            params: {
              team: TeamNameToID[awayTeamName],
              season: '2023'
            },
            headers: {
              'X-RapidAPI-Key': RapidAPIKey,
              'X-RapidAPI-Host': RapidAPIHost_API_NBA
            }
          };
          
          try {
              const response = await axios.request(options);
              let playerStats = response.data.response.filter((gameStats: any) => `${gameStats.player.firstname} ${gameStats.player.lastname}` === description);
              if (playerStats?.length === 0){
                const awayResponse = await axios.request(awayOptions);
                playerStats = awayResponse.data.response.filter((gameStats: any) => `${gameStats.player.firstname} ${gameStats.player.lastname}` === description);
              }
              setRecentGamesData(playerStats);
          } catch (error) {
              console.error(error);
          }
    };

    return (
        <div>
            {description} {name} {point}: {price}  <button onClick={getRecentGamesData}>View trends</button>
            {recentGamesData.length ? <RecentTrends recentGamesData={recentGamesData} bet={name} point={point}/> : null}
        </div>
    );
}

const RecentTrends: React.FC<{recentGamesData: PlayerStatsType[], bet: string, point: number}> = ({recentGamesData, bet, point}) => {
    const gamesHitOver: number = recentGamesData.filter((game) => game.points > point).length;
    const gamesHitUnder: number = recentGamesData.length - gamesHitOver;

    if (bet === "Over") {
        return (
            <div> 
                <div>He has hit the over in {gamesHitOver} of {recentGamesData.length} games this season ({((gamesHitOver / recentGamesData.length) * 100).toFixed(2)}%)</div> 
            </div>
        )
    } else if (bet === "Under") {
        return(
            <div>He has hit the under in {gamesHitUnder} of {recentGamesData.length} games this season({((gamesHitUnder / recentGamesData.length) * 100).toFixed(2)}%)</div>
        );
    }
    return null;
};