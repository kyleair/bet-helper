import React, {useState} from 'react';
import axios from 'axios';

import { RapidAPIKey, RapidAPIHost } from '../utils';

interface LeagueType {
    id: number;
    logo: string;
    name: string;
    season: string;
    type: string;
}

interface GamesResponse {
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

    const onFetchDataClick = async () => {
        const options = {
            method: 'GET',
            url: 'https://api-basketball.p.rapidapi.com/games',
            params: {
                timezone: 'America/Toronto',
                league: '12', // league ID for NBA from API
                date: '2023-12-01' // need to make this always be todays date
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
            { responseData ?
                "responseData.response[0].league.name:" + responseData[0].league.name : <div>data is null</div>
            }
        
        </div>
    );
}