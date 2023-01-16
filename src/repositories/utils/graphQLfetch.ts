//todo consider having this as a typed generic

export const REACT_APP_CONTENTFUL_SPACE_ID = "fojlfyn3xufg";
export const REACT_APP_CONTENTFUL_ACCESS_TOKEN =
  "-kDKoZzkrGEjncgbgYjRQjA3fx9XT6cF20Lqyzrf7Vs";
export const REACT_APP_CONTENTFUL_ENVIRONMENT = "master";

const TOKEN = REACT_APP_CONTENTFUL_ACCESS_TOKEN; //process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;
const SPACE = REACT_APP_CONTENTFUL_SPACE_ID; //process.env.REACT_APP_CONTENTFUL_SPACE_ID;
const ENVIRONMENT = REACT_APP_CONTENTFUL_ENVIRONMENT; //process.env.REACT_APP_CONTENTFUL_ENVIRONMENT;
export const CONTENT_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENVIRONMENT}`;
export const fetchDataContentful = <TType>(query: string) =>
  fetchData<TType>(CONTENT_URL, query);

export const fetchData = async <TType>(
  url: string,
  query: string
): Promise<TType> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query }),
  };
  return await fetch(url, options).then((res) => res.json());
};
