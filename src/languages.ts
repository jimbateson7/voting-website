import {fetchDataDato} from "./repositories/utils/graphQLfetch";
import countryCodeToFlagEmoji from "country-code-to-flag-emoji";
export const defaultLanguage = "en";


const localesQuery = `query {
  _site {
    locales # -> ["en", "it", "fr"]
  }
}`

interface QueryResult
{
    data:
        {
            _site: {
                locales: string[]
            }
        }
}

export type CountryFlag =
{
    code:string;
    flag:string;
}



let supportedLanguages: string[] = [];

let supportedCountries:CountryFlag[] =[];
export const defaultFlag = {code:"en", flag:countryCodeToFlagEmoji("en")}

export const getSupportedLocales = (): string[] => {
    if (supportedLanguages.length === 0) {
        
         fetchDataDato<QueryResult>(localesQuery).then((root: QueryResult) => {            
             supportedLanguages = root.data._site.locales;

        });
    }

    return supportedLanguages;
};

export const getSupportedCountries = ()  => {

    if(supportedCountries.length === 0)
    {
        getSupportedLocales().forEach( (supportedLanguage) => 
        {
            if(supportedLanguage == "en")
            {
                supportedLanguage = "en-gb";
            }
            const flagCode: CountryFlag = {code:supportedLanguage, flag:countryCodeToFlagEmoji(supportedLanguage.replace("_","-"))};
            
            supportedCountries.push(flagCode)
        })
        
    }
    
   return supportedCountries;
};