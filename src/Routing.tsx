import {useEffect, useState} from "react";

import "./App.scss";
import Layout from "../src/pages/Layout";
import {ContentTypes, NavigationItem} from "./repositories/Navigation/types";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import VotingPage from "./pages/VotingPage";
import {ArticlePage} from "./components/Page";
import NoPage from "./pages/NoPage";
import LoadingPage from "./pages/LoadingPage";
import {DEBUG_QUERY, refreshPreview} from "./repositories/utils/preview";
import {extractYoutubeVideoId, LogLinks} from "./repositories/utils/utilities";
import {VideoPage} from "./components/VideoPage";
import {getAllNavData} from "./repositories/Common/request";

export const headerComponentId = "2EASI81WCZEAsg9bRP370U";
export const footerComponentId = "3u1pE30pV8DPDLIq2Ki49w";

function Routing() {
  async function fetchData() {
    let links = await getAllNavData(); //todo we should probably just split this into the 3 arrays, save switching on typename below
    if(process.env.NODE_ENV === "development" && DEBUG_QUERY) 
    {      
      LogLinks(links,"routing");
    }
    setData(links);
    setDataLoaded(true);
  }

  const [data, setData] = useState<NavigationItem[]>();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [voted, setVoted] = useState(false);
  
  refreshPreview();
  
  useEffect(() => {
    fetchData().catch(console.error);
  }, []);
  
  const createDynamicRoutes = () => {
    return (
      <>
        {data &&
          data.map((navItem, index) => {
            switch (navItem.__typename) {
              case ContentTypes.VotingPage:
            
                return (
                  <Route
                    key={index}
                    path={navItem.slug}                     
                    element={
                      <VotingPage
                          heading={navItem.heading}
                        introVideoId={extractYoutubeVideoId(navItem.introVideo)}
                        postVoteVideoId={extractYoutubeVideoId(
                          navItem.postVoteVideo
                        )}
                        showStatistics={navItem.showVoteStatistics ?? false}
                        introText={navItem.introductionText ?? ""}
                        votingThankYou={navItem.votingThankYou ?? ""}
                        votingPostVoteExplanation={navItem.votingPostVoteExplanation}
                        shareHeading={navItem.shareHeading}
                        shareSubHeading={navItem.shareSubHeading}                        
                        title={navItem.title ?? ""}
                        showIntroVideo={true}
                        showSharePanel={true}
                        voted={voted}
                        setVoted={setVoted}
                      />
                    }
                  />
                );
        
              case ContentTypes.BlogPost:
                if(navItem.slug == "index")
                {
                  return (
                      <Route
                          key={index}
                          index
                          element={<ArticlePage slug={navItem.slug ?? "blog"} />}
                      />
                  );
                }
                return (
                  <Route
                    key={index}
                    
                    path={navItem.slug ?? "blog"}
                    element={<ArticlePage slug={navItem.slug ?? "blog"} />}
                  />
                );
              case ContentTypes.VideoPage:
                return (
                    <Route
                        key={index}
                        path={navItem.slug ?? "video"}
                        element={<VideoPage slug={navItem.slug ?? "video"} />}
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
          {dataLoaded ?  <Route path="*" element={<LoadingPage />} /> : <Route path="*" element={<NoPage />} />}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
