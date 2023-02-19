import { ReactNode, useEffect, useState } from "react";

import "./Page.scss";
import "./HubCollection.scss";
import { getPageJson } from "../repositories/Articles/request";
export interface TPage {
  header: string;
  heroImageUrl?: string;
  heroImageAltText?: string;
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

  const styleClass = data.heroImageUrl ? "heroWithImage" : "hero";
  return (
    <>

      <div className={styleClass}>
        <h1>{data.header}</h1>
        {data.heroImageUrl ? (
          <img src={data.heroImageUrl} alt={data.heroImageAltText}></img>
        ) : null}
      </div>
      

      <div>{data.richText ? data.richText : <p>...</p>}</div>

    </>
  );
};
