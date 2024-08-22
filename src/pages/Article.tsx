import React, {useCallback, useEffect, useState} from "react";
import "./Page.scss";
import "../components/HubCollection.scss";
import {getPageJson} from "../repositories/Articles/request";
import {LogException} from "../repositories/utils/utilities";
import {TArticlePage} from "../repositories/Common/types";
import {PageData, TPage} from "../components/PageData";


export const ArticlePage = (props: TArticlePage) => {
    let {slug,locale} = props;

    const fetchData = useCallback(async () => {
        let dataFetched = await getPageJson(slug, locale);
        setData(dataFetched);
    }, [slug,locale])

    const [data, setData] = useState<TPage>({
        header: "...",
        richText: null,
    });

    useEffect(() => {
        fetchData().catch(reason => {
            LogException(reason)
        });

    }, [slug, fetchData]);

    return (<PageData {...data}/>)
};
