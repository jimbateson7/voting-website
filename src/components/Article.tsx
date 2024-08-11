import {useCallback, useEffect, useState} from "react";
import "./Page.scss";
import "./HubCollection.scss";
import {getPageJson} from "../repositories/Articles/request";
import {LogException} from "../repositories/utils/utilities";
import {TArticlePage} from "../repositories/Common/types";
import {PageData, TPage} from "./PageData";

export const ArticlePage = (props: TArticlePage) => {
    let {slug} = props;

    const fetchData = useCallback(async () => {
        let dataFetched = await getPageJson(slug);
        setData(dataFetched);
    }, [slug])

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
