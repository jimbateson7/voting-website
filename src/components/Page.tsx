﻿import { ReactNode, useEffect, useState } from "react";
import "./Page.scss";
import { getPageJson } from "../repositories/Articles/request";
export interface TPage {
  header: string;

  richText: ReactNode;
}
export type TArticlePage = {
  slug: string;
};
export const ArticlePage = (props: TArticlePage) => {
  let { slug } = props;
  async function fetchData() {
    let dataFetched = await getPageJson(slug);
    setData(dataFetched);
  }
  const [data, setData] = useState<TPage>({
    header: "...",
    richText: null,
  });

  useEffect(() => {
    fetchData().catch(console.error);
  }, [slug]);

  return (
    <>
      <h1>{data.header}</h1>

      <div>{data.richText ? data.richText : <p>...</p>}</div>
    </>
  );
};
