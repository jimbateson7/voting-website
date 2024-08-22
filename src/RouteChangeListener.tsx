import {useEffect, useState} from "react";
import {defaultLanguage, getSupportedLocales} from "./languages";
import {useLocation} from "react-router-dom";


export interface IRouteListener
{
    onSetLocale: (locale:string) => void;
}
export const RouteChangeListener = ({onSetLocale}: IRouteListener) => {

    const [locale, setLocale] = useState(defaultLanguage)

    const SetLocale = (locale: string) => {
        setLocale(locale);
        onSetLocale(locale);
    }

    const getLocale = (path: string) => {
        const extractLocale = path.substring(1, 3);
        return getSupportedLocales().includes(extractLocale) ? extractLocale : defaultLanguage;
    }

    const location = useLocation();

    useEffect(() => {
        const newLocale = getLocale(location.pathname);
        SetLocale(newLocale);        
    }, [location]);


    return (<></>)

}