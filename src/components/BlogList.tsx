import {useCallback, useEffect, useState} from "react";
import "./Page.scss";
import "./HubCollection.scss";
import {getPagesJson} from "../repositories/Articles/request";
import {LogException} from "../repositories/utils/utilities";

import {PageData, TPage} from "./PageData";

export const BlogList = () => {

  const blogsPerPage = 10;
  const [pageNumber, setPageNumber] = useState<number> (0);
  const fetchData = useCallback(async () => {
    let dataFetched = await getPagesJson(pageNumber,blogsPerPage);
    dataFetched = data ? data.concat(dataFetched) : dataFetched;
    setData(dataFetched);
  }, [pageNumber])
  
  const [data, setData] = useState<TPage[]>([]);
  
  useEffect(() => {
    fetchData().catch(reason => {LogException(reason)});
        
  }, [pageNumber,fetchData]);

  return (
    <>
      {data.map( (pageData,index) => (<PageData key={index} {...pageData}/>))}

      <button onClick={() => setPageNumber(pageNumber+1)}>Load More</button>
    </>
  );
};
