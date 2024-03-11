import React, { useState, useContext, useEffect } from "react";
import { OutcomeType } from "./GameDetails";
import { Text, Column, TextButton } from './StyledComponents';
import { PropMarketContext, PropMarkets } from './Homepage';
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
            {description} {name} {point}: {price > 0 ? "+" : ""}{price}  <TextButton onClick={() => setShowTrends(!showTrends)}>{showTrends ? "Hide trends" :"View trends"}</TextButton>
            {showTrends && recentGamesData ? <RecentTrends recentGamesData={recentGamesData} bet={name} point={point}/> : null}
        </Text>
    );
}

interface Trends {
    gamesHitOver: number;
    lastTenGamesHitOver?: number;
}
const RecentTrends: React.FC<{recentGamesData: PlayerStatsType[], bet: string, point: number}> = ({recentGamesData, bet, point}) => {
    const market = useContext(PropMarketContext);
    const getGamesHitOver = (): Trends => {
        switch (market) {
            case PropMarkets.POINTS:
                return {
                    gamesHitOver: recentGamesData.filter((game) => game.points > point).length,
                    lastTenGamesHitOver: recentGamesData.length >= 10 ? recentGamesData.slice(-10).filter((game) => game.points > point).length : undefined,
                }

            case PropMarkets.REBOUNDS:
                return {
                    gamesHitOver: recentGamesData.filter((game) => game.totReb > point).length,
                    lastTenGamesHitOver: recentGamesData.length >= 10 ? recentGamesData.slice(-10).filter((game) => game.totReb > point).length : undefined,
                }
            
            case PropMarkets.ASSISTS:
                return {
                    gamesHitOver: recentGamesData.filter((game) => game.assists > point).length,
                    lastTenGamesHitOver: recentGamesData.length >= 10 ? recentGamesData.slice(-10).filter((game) => game.assists > point).length : undefined,
                };
            case PropMarkets.THREES:
                return {
                    gamesHitOver: recentGamesData.filter((game) => game.tpm > point).length,
                    lastTenGamesHitOver: recentGamesData.length >= 10 ? recentGamesData.slice(-10).filter((game) => game.tpm > point).length : undefined,
                };
            case PropMarkets.BLOCKS:
                return {
                    gamesHitOver: recentGamesData.filter((game) => game.blocks > point).length,
                    lastTenGamesHitOver: recentGamesData.length >= 10 ? recentGamesData.slice(-10).filter((game) => game.blocks > point).length : undefined,
                };
            case PropMarkets.STEALS:
                return {
                    gamesHitOver: recentGamesData.filter((game) => game.steals > point).length,
                    lastTenGamesHitOver: recentGamesData.length >= 10 ? recentGamesData.slice(-10).filter((game) => game.steals > point).length : undefined,
                };
            case PropMarkets.BLOCKS_STEALS:
                return {
                    gamesHitOver: recentGamesData.filter((game) => game.blocks + game.steals > point).length,
                    lastTenGamesHitOver: recentGamesData.length >= 10 ? recentGamesData.slice(-10).filter((game) => game.blocks + game.steals > point).length : undefined,
                };
            case PropMarkets.TURNOVERS:
                return {
                    gamesHitOver: recentGamesData.filter((game) => game.turnovers > point).length,
                    lastTenGamesHitOver: recentGamesData.length >= 10 ? recentGamesData.slice(-10).filter((game) => game.turnovers > point).length : undefined,
                };
            case PropMarkets.POINTS_REBOUNDS_ASSISTS:
                return {
                    gamesHitOver: recentGamesData.filter((game) => game.points + game.totReb + game.assists > point).length,
                    lastTenGamesHitOver: recentGamesData.length >= 10 ? recentGamesData.slice(-10).filter((game) => game.points + game.totReb + game.assists > point).length : undefined,
                };
            case PropMarkets.POINTS_REBOUNDS:
                return {
                    gamesHitOver: recentGamesData.filter((game) => game.points + game.totReb > point).length,
                    lastTenGamesHitOver: recentGamesData.length >= 10 ? recentGamesData.slice(-10).filter((game) => game.points + game.totReb > point).length : undefined,
                };
            case PropMarkets.POINTS_ASSISTS:
                return {
                    gamesHitOver: recentGamesData.filter((game) => game.points + game.assists > point).length,
                    lastTenGamesHitOver: recentGamesData.length >= 10 ? recentGamesData.slice(-10).filter((game) => game.points + game.assists > point).length : undefined,
                };
            case PropMarkets.REBOUNDS_ASSISTS:
                return {
                    gamesHitOver: recentGamesData.filter((game) => game.totReb + game.assists > point).length,
                    lastTenGamesHitOver: recentGamesData.length >= 10 ? recentGamesData.slice(-10).filter((game) => game.totReb + game.assists > point).length : undefined,
                };
            case PropMarkets.FIRST_BASKET:
                return {
                    gamesHitOver: recentGamesData.filter((game) => game.points > point).length,
                    lastTenGamesHitOver: recentGamesData.length >= 10 ? recentGamesData.slice(-10).filter((game) => game.points > point).length : undefined,
                };
            case PropMarkets.DOUBLE_DOUBLE:
                return {
                    gamesHitOver: recentGamesData.filter((game) => game.points > point).length,
                    lastTenGamesHitOver: recentGamesData.length >= 10 ? recentGamesData.slice(-10).filter((game) => game.points > point).length : undefined,
                };
            case PropMarkets.TRIPLE_DOUBLE:
                return {
                    gamesHitOver: recentGamesData.filter((game) => game.points > point).length,
                    lastTenGamesHitOver: recentGamesData.length >= 10 ? recentGamesData.slice(-10).filter((game) => game.points > point).length : undefined,
                };
            case undefined:
                return {
                    gamesHitOver: recentGamesData.filter((game) => game.points > point).length,
                    lastTenGamesHitOver: recentGamesData.length >= 10 ? recentGamesData.slice(-10).filter((game) => game.points > point).length : undefined,
                };
        }
    }
    // const gamesHitOver: number = recentGamesData.filter((game) => game.points > point).length;
    const { gamesHitOver, lastTenGamesHitOver } = getGamesHitOver();
    const gamesHitUnder: number = recentGamesData.length - gamesHitOver;
    const playedTenGames: boolean = recentGamesData.length > 10;
    const lastTenGames: PlayerStatsType[] = recentGamesData.slice(-10);
    // const lastTenGamesHitOver: number = lastTenGames.filter((game) => game.points > point).length;
    const lastTenGamesHitUnder: number | undefined = lastTenGamesHitOver ? lastTenGames.length - lastTenGamesHitOver : undefined;
    


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
};