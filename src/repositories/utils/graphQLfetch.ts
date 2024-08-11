//todo consider having this as a typed generic
import {HandleErrors} from "./utilities";

export const node_env = process.env.NODE_ENV;

//temp override while I work out why env variables dont work
export const developmentSpace = "dev" //todo set to development when i work out whats going on with that...

export const APP_CONTENTFUL_ACCESS_TOKEN = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN ?? "f0565dcceef2eae29b1536d3d6157a";
export const APP_CONTENTFUL_ENVIRONMENT = process.env.REACT_APP_CONTENTFUL_ENVIRONMENT ?? node_env === "development" ? developmentSpace : "main";

const TOKEN = APP_CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = "";// APP_CONTENTFUL_ENVIRONMENT;
export const CONTENT_URL = 'https://graphql.datocms.com/'; //`https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENVIRONMENT}`;
export const fetchDataContentful = <TType>(query: string) =>
    fetchData<TType>(CONTENT_URL, query);

export const fetchData = async <TType>(
    url: string,
    query: string
): Promise<TType> => {
    /* 
     console.log("--------------Query---------------------")
     console.log(query);
     console.log("--------------EOF Query---------------------")
     */
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-Environment': ENVIRONMENT,
            Accept: "application/json",
            Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({query}),
    };


    return await fetch(url, options).then((res) => {
        const result = res.json();
        HandleErrors(result)
        return result
    });
};
