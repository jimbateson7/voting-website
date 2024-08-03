import {Choice, Vote} from "../models";
import {DataStore} from "@aws-amplify/datastore";
import {useEffect, useState} from "react";
import {getCountryList} from "../repositories/utils/country";
import {Doughnut} from "react-chartjs-2";
import "./VoteResults.scss";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Col, Row} from "react-bootstrap";


export const VoteResults = ({questionId}: { questionId: string }) => {

    const [yesVotes, setYesVotes] = useState(0);
    const [noVotes, setNoVotes] = useState(0);

    const [selectedCountry, setSelectedCountry] = useState<string>('');

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(countries[event.target.value]);
    };

    useEffect(() => {

        async function fetchVotes(country: string | undefined) {
            const no = (await DataStore.query(Vote, (v) => v.and(v => [v.choice.eq(Choice.NO), v.questionId.eq(questionId), country ? v.country.eq(country) : v.country.notContains(null)]))).length;
            const yes = (await DataStore.query(Vote, (v) => v.and(v => [v.choice.eq(Choice.YES), v.questionId.eq(questionId), country ? v.country.eq(country) : v.country.notContains(null)]))).length;
            setYesVotes(yes);
            setNoVotes(no);
        }

        if (selectedCountry === "All") {
            console.log("getting all results")
            //get all votes
            fetchVotes(undefined);
        } else {
            console.log("getting results for " + selectedCountry)
            fetchVotes(selectedCountry);
        }
    }, [selectedCountry]);

    
    ChartJS.register(ArcElement, Tooltip); // Register required elements


    const chartData = {
        datasets: [
            {
                data: [noVotes,yesVotes],
                backgroundColor: ['#6ea296', '#217293'],
                hoverBackgroundColor: ['#a4c5be', '#57b3d9'],
                    
            },
        ],
        labels: ['No', 'Yes'],
        
    };
    
    const chartOptions =   {
      
       
    }

        
        
    interface Country {
        [code: string]: string;
    }

    const countries: Country = getCountryList();

    const [isHovered, setIsHovered] = useState(false);


    return (<div className={"vote-results"}>

        <Row>
            <Col xs lg="2"/>
            <Col>
                <select value={""} onChange={handleCountryChange}>


                    {selectedCountry ?
                        <>
                            <option
                                value={selectedCountry}> {`${selectedCountry} Results`}</option>
                            <option
                                value={undefined} key={"All"}>All Countries
                            </option>
                        </> :
                        <option
                            value={undefined}> {`All Countries Results`}</option>}


                    {Object.entries(countries).map(([countryCode, countryName]) => {
                        if (selectedCountry !== countryCode) {
                            return (<option key={countryCode} value={countryCode}>
                                {countryName}
                            </option>)
                        }
                    })}
                </select>
            </Col>
            
        </Row>
        <Row>
            <Col>
                <div className={"chart-container"} data-hovered={isHovered.toString()}>

                    <Doughnut className={"chart"} data={chartData} options={chartOptions} 
                              data-hovered={isHovered.toString()} onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}/>

                </div>
            </Col>
        </Row>


    </div>)
}