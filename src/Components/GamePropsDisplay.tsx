import React, { useState, useContext, useEffect } from "react";
import { OutcomeType } from "./GameDetails";
import { Text, Column, TextButton } from './StyledComponents';
import { PropMarketContext } from './Homepage';
import { BookmakerContext } from './GameDetails';

export interface PlayerStatsType {
    assists: number;
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

export const GamePropsDisplay: React.FC<OutcomeType & { homeTeamData?: PlayerStatsType[]; awayTeamData?: PlayerStatsType[];}> = ({description, point, price, name, homeTeamData, awayTeamData }) => {
    const market = useContext(PropMarketContext);
    const currentBookmaker = useContext(BookmakerContext);
    const [showTrends, setShowTrends] = useState<boolean>(false);
    let recentGamesData = homeTeamData?.filter((gameStats: any) => `${gameStats.player.firstname} ${gameStats.player.lastname}` === description);
    if (recentGamesData?.length === 0){
      recentGamesData = awayTeamData?.filter((gameStats: any) => `${gameStats.player.firstname} ${gameStats.player.lastname}` === description);
    }

    useEffect(() => {
        setShowTrends(false);
    }, [market, currentBookmaker]);


    return (
        <Text>
            {description} {name} {point}: {price > 0 ? "+" : ""}{price}  <TextButton onClick={() => {setShowTrends(!showTrends); console.log("recent games", recentGamesData);}}>{showTrends ? "Hide trends" :"View trends"}</TextButton>
            {showTrends && recentGamesData ? <RecentTrends recentGamesData={recentGamesData} bet={name} point={point}/> : null}
        </Text>
    );
}

const RecentTrends: React.FC<{recentGamesData: PlayerStatsType[], bet: string, point: number}> = ({recentGamesData, bet, point}) => {
    const gamesHitOver: number = recentGamesData.filter((game) => game.points > point).length;
    const gamesHitUnder: number = recentGamesData.length - gamesHitOver;
    const playedTenGames: boolean = recentGamesData.length > 10;
    const lastTenGames: PlayerStatsType[] = recentGamesData.slice(-10);
    const lastTenGamesHitOver: number = lastTenGames.filter((game) => game.points > point).length;
    const lastTenGamesHitUnder: number = lastTenGames.length - lastTenGamesHitOver;


    if (bet === "Over") {
        return (
            <Column> 
                <Text fontWeight={700}>He has hit the over in {gamesHitOver} of {recentGamesData.length} games this season ({((gamesHitOver / recentGamesData.length) * 100).toFixed(2)}%)</Text>
                {playedTenGames ? <Text fontWeight={700}>Out of the last 10 games, he has hit the over {lastTenGamesHitOver} times</Text> : null}
            </Column>
        )
    } else if (bet === "Under") {
        return(
            <Column>
                <Text fontWeight={700}>He has hit the under in {gamesHitUnder} of {recentGamesData.length} games this season({((gamesHitUnder / recentGamesData.length) * 100).toFixed(2)}%)</Text>
                {playedTenGames ? <Text fontWeight={700}>Out of the last 10 games, he has hit the under {lastTenGamesHitUnder} times</Text> : null}
            </Column>
        );
    }
    return null;

    //need function to get overs, that runs same calculation (1 func) just using diff fields (call func for each field) depending on our global propmarket context - use switch
    const getGamesHitOver = () => {
        
    }
};