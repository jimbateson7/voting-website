﻿import { ReactNode, useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";
import "./Page.css";
import { getPageJson } from "../repositories/Articles/request";
export interface TPage {
  header: string;
  body: string;
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
    header: "Loading",
    body: "",
    richText: null,
  });

  useEffect(() => {
    fetchData().catch(console.error);
  });

  return (
    <>
      <h1>{data.header}</h1>
      <div>
        <ReactMarkdown>{data.body}</ReactMarkdown>
      </div>
      <div>{data.richText ? data.richText : <p>Rich text was null</p>}</div>
    </>
  );
};
