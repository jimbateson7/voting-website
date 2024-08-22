import React, {useState, useEffect, ChangeEvent} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const supportedCountries = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    // Add more countries here
];

const FlagSelect = () => {
    const [selectedCountry, setSelectedCountry] = useState(supportedCountries[0]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const pathname = location.pathname;
        const countryCode = pathname.substring(1);
        const foundCountry = supportedCountries.find(country => country.code === countryCode);

        if (foundCountry) {
            setSelectedCountry(foundCountry);
        } 
    }, [location, navigate]);

    const handleCountryChange = (event : ChangeEvent<HTMLSelectElement>) => {
        const selectedCountryCode = event.target.value;
        const selectedCountry = supportedCountries.find(country => country.code === selectedCountryCode);

        if (selectedCountry) {
            setSelectedCountry(selectedCountry);
            navigate(`/${selectedCountry.code}`);
        }
    };

    return (
        <select onChange={handleCountryChange} value={selectedCountry.code} style={{width:"unset"}}>
            {supportedCountries.map(country => (
                <option key={country.code} value={country.code}>
             
                    {country.flag}
                   
                </option>
            ))}
        </select>
    );
};

export default FlagSelect;