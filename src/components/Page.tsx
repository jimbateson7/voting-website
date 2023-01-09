import { ReactNode, useEffect, useState } from "react";
import { getPageJson } from "../repositories/ContactUs/request";
import ReactMarkdown from "react-markdown";
import "./Page.css";
export interface TPage {
  header: string;
  body: string;
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
  const [data, setData] = useState<TPage>({ header: "Loading", body: "" });

  useEffect(() => {
    fetchData().catch(console.error);
  });

  return (
    <>
      <h1>{data.header}</h1>
      <div>
        <ReactMarkdown>{data.body}</ReactMarkdown>
      </div>
    </>
  );
};
