import {useCallback, useEffect, useState} from "react";
import "./Page.scss";
import "./HubCollection.scss";
import {getPagesJson} from "../repositories/Articles/request";
import {LogException} from "../repositories/utils/utilities";

import {PageData, TPage} from "./PageData";
import {Button} from "react-bootstrap";

export const BlogList = ({locale}: { locale: string }) => {


    const blogsPerPage = 3;
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [morePages, setMorePages] = useState(true);
    const fetchData = useCallback(async () => {


        let dataFetched = await getPagesJson(pageNumber, locale, blogsPerPage);
        if (dataFetched.length < blogsPerPage) {
            setMorePages(false);
        }
        dataFetched = data ? data.concat(dataFetched) : dataFetched;

        setData(dataFetched);

    }, [pageNumber])

    const [data, setData] = useState<TPage[]>([]);

    useEffect(() => {

        fetchData().catch(reason => {
            LogException(reason)
        });


    }, [pageNumber, fetchData]);

    const dataToUse: TPage[] = data.length && !pageNumber ? [data[0]] : data;


    return (
        <>

            {dataToUse.map((pageData, index) => <PageData key={index} {...pageData}/>)}

            {morePages ? <Button onClick={() => setPageNumber(pageNumber + 1)}>See More</Button> : null}
        </>
    );
};
