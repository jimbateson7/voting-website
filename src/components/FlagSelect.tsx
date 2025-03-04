import React, {useState, ChangeEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import {CountryFlag, defaultFlag, getSupportedCountries} from "../languages";


const FlagSelect = ({currentLocale}: {currentLocale:string}) => {
    const supportedCountries = getSupportedCountries();
    const defaultCountryFlag: CountryFlag = (supportedCountries.find(country => country.code === currentLocale)) ?? defaultFlag ;
    const [selectedCountry, setSelectedCountry] = useState(defaultCountryFlag);
    const navigate = useNavigate();

    const handleCountryChange = (event : ChangeEvent<HTMLSelectElement>) => {
        const selectedCountryCode = event.target.value;
        const selectedCountry = supportedCountries.find(country => country.code === selectedCountryCode);

        if (selectedCountry) {
            setSelectedCountry(selectedCountry);
            navigate(`/${selectedCountry.code}`);
        }
    };

    return (
        <>
            <label className="visually-hidden" htmlFor="country_select">Select language</label>
            <select onChange={handleCountryChange} id="country_select" value={selectedCountry.code} style={{width:"unset"}}>
                {supportedCountries.map(country => (
                    <option key={country.code} value={country.code}>
                        {country.flag}
                    </option>
                ))}
            </select>
        </>
    );
};

export default FlagSelect;