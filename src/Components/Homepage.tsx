import React, {useState} from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { RapidAPIKey, RapidAPIHost } from '../utils';
import { Game } from './Game';

interface LeagueType {
    id: number;
    logo: string;
    name: string;
    season: string;
    type: string;
}

export interface GamesResponse {
    country: any;
    date: Date;
    id: number;
    league: LeagueType;
    scores: any;
    stage?: string;
    status: any;
    teams: any;
    time: string;
    timestamp: number;
    timezone: string;
    week: any;
}

export const Homepage: React.FC = () => {
    const [responseData, setResponseData] = useState<GamesResponse[]>();
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const formattedDate = format(startDate ?? new Date(), 'yyyy-MM-dd');
    const season = formatSeason(startDate ?? new Date());

    const onFetchDataClick = async () => {
        const options = {
            method: 'GET',
            url: 'https://api-basketball.p.rapidapi.com/games',
            params: {
                timezone: 'America/Toronto',
                league: '12', // league ID for NBA from API
                date: formattedDate, 
                season: season,
              },
            headers: {
              'X-RapidAPI-Key': RapidAPIKey,
              'X-RapidAPI-Host': RapidAPIHost
            }
          };
          
          try {
              const response = await axios.request(options);
              setResponseData(response.data.response);
              console.log(response.data.response);
          } catch (error) {
              console.error(error);
          }
    }

    return(
        <div>
            <button onClick={onFetchDataClick}>fetch data</button>
            <div>{formattedDate} and year is {season}</div>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <div style={{marginTop: "16px"}}>
                {responseData?.map((gameData) => (
                   <Game {...gameData}/>
                ))}
            </div>
        </div>
    );
}

const formatSeason = (date: Date): string => {
    const year = format(date, 'yyyy');
    if (date.getMonth() > 8){
        return `${year}-${(Number(year)+1)}`
    }
    return `${(Number(year)-1)}-${year}`;
};