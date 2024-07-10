import {Choice, Vote} from "../models";
import {DataStore} from "@aws-amplify/datastore";
import { useEffect, useState } from "react";
import { getCountryList} from "../repositories/utils/country";
import { Doughnut } from "react-chartjs-2";
import "./VoteResults.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';




export const VoteResults = ({questionId}: { questionId: string }) => {

    const [yesVotes, setYesVotes] = useState(0);
    const [noVotes, setNoVotes] = useState(0);
   
    const [selectedCountry, setSelectedCountry] = useState<string>('');

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(countries[event.target.value]);
    };
    
    useEffect(() => {
        
        async function fetchVotes(country:string|undefined) {
            const no = (await DataStore.query(Vote, (v) => v.and(v => [v.choice.eq(Choice.NO), v.questionId.eq(questionId), country ? v.country.eq(country) :v.country.notContains(null)]))).length;
            const yes = (await DataStore.query(Vote, (v) => v.and(v => [v.choice.eq(Choice.YES), v.questionId.eq(questionId), country ? v.country.eq(country) :v.country.notContains(null)]))).length;
            setYesVotes(yes);
            setNoVotes(no);
        }
        if(selectedCountry === "All")
        {
            //get all votes
            fetchVotes(undefined);
        }
        else {
            fetchVotes(selectedCountry);
        }
    }, [selectedCountry]);

    ChartJS.register(ArcElement, Tooltip, Legend); // Register required elements

    const chartData = {
        datasets: [
            {
                data: [yesVotes, noVotes],
                backgroundColor: ['green', 'grey'],
                hoverBackgroundColor: ['lightgreen', 'lightcoral'],
            },
        ],
        labels: ['Yes', 'No'],
    };
    
    
    interface Country {
        [code: string]: string;
    }

    const countries: Country = getCountryList();
    countries["All"] = "All";
    
    
    return (<div className={"vote-results"}>
        <div>
            <select value={selectedCountry} onChange={handleCountryChange}>
                <option value="">{selectedCountry ? "Change Country" : "Select Country"}</option>
                {Object.entries(countries).map(([countryCode, countryName]) => (
                    <option key={countryCode} value={countryCode}>
                        {countryName}
                    </option>
                ))}
            </select>

            
            <div className={"chart-container"}>
                <Doughnut data={chartData} options={{maintainAspectRatio: true, circumference:(360),responsive:true }}/>
                {selectedCountry ? <h2>Vote Breakdown for {selectedCountry}</h2> : null}
            </div>
            
     
        </div>
    </div>)
}