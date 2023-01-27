import { useEffect, useState } from "react";

import "./App.scss";
import Layout from "../src/pages/Layout";
import { getNavigationJson } from "./repositories/Navigation/request";
import { NavigationItem, NavTypes } from "./repositories/Navigation/types";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VotingPage from "./pages/VotingPage";
import { ArticlePage } from "./components/Page";
import MemberArea from "./pages/MemberArea";
import NoPage from "./pages/NoPage";
import LoadingPage from "./pages/LoadingPage";
import {DEBUG_QUERY, refreshPreview} from "./repositories/utils/preview";


export const headerComponentId = "2EASI81WCZEAsg9bRP370U";
export const footerComponentId = "4NIP2EIoA7na6BuwxArtLi";

export async function flattenNavigationRoute(
  id: string
): Promise<NavigationItem[]> {
  let dataFetched = await getNavigationJson(id);
  let childIds: string[] = dataFetched
    .filter((x) => x.__typename == NavTypes.NavigationGroup)
    .map((x) => x.sys?.id ?? "INVALID")
    .filter((x) => x != "INVALID");
  for (const childId of childIds) {
    dataFetched = dataFetched.concat(await flattenNavigationRoute(childId));
  }
  return dataFetched;
}

function App() {
  async function fetchData() {
    let headerLinks = await flattenNavigationRoute(headerComponentId);
    let footerLinks = await flattenNavigationRoute(footerComponentId);

    if(process.env.NODE_ENV === "development" && DEBUG_QUERY) {
      console.log("Fetching navigation data");
      console.log(headerLinks);
    }
    setData(headerLinks.concat(footerLinks));
    setDataLoaded(true);
  }

  const [data, setData] = useState<NavigationItem[]>();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [voted, setVoted] = useState(false);
  
  refreshPreview();
  
  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const extractYoutubeVideoId = (fullUrl?: string): string => {
    if (!fullUrl) return "Invalid Video";

    //this way someone can add a "watch/embed/share" yt link and it will still work
    const youtubeId = fullUrl.slice(-11);

    return youtubeId;
  };
  const createDynamicRoutes = () => {
    return (
      <>
        {data &&
          data.map((navItem, index) => {
            switch (navItem.__typename) {
              case NavTypes.VotingPage:
                return (
                  <Route
                    key={index}
                    index
                    element={
                      <VotingPage
                        introVideoId={extractYoutubeVideoId(navItem.introVideo)}
                        postVoteVideoId={extractYoutubeVideoId(
                          navItem.postVoteVideo
                        )}
                        title={navItem.title ?? ""}
                        showIntroVideo={!voted}
                        showSharePanel={voted}
                        voted={voted}
                        setVoted={setVoted}
                      />
                    }
                  />
                );

              case NavTypes.BlogPost:
                return (
                  <Route
                    key={index}
                    path={navItem.slug ?? "blog"}
                    element={<ArticlePage slug={navItem.slug ?? "blog"} />}
                  />
                );

              default:
                return null;
            }
          })}
      </>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {createDynamicRoutes()}
          <Route
            path="memberArea"
            element={<MemberArea signOut={null} user={null} />}
          />
          {dataLoaded ?  <Route path="*" element={<LoadingPage />} /> : <Route path="*" element={<NoPage />} />}
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
