import React, { useEffect, useState } from "react";

import "./App.scss";
import Layout from "../src/pages/Layout";
import { getNavigationJson } from "./repositories/Navigation/request";
import { NavigationItem, NavTypes } from "./repositories/Navigation/types";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VotingPage from "./pages/VotingPage";
import { ArticlePage } from "./components/Page";
import MemberArea from "./pages/MemberArea";
import Privacy from "./pages/Privacy";
import EndingMembership from "./pages/EndingMembership";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

export const headerComponentId = "2EASI81WCZEAsg9bRP370U";

function App() {
  const id = headerComponentId;

  async function fetchData() {
    let dataFetched = await getNavigationJson(id);
    console.log("Fetching navigation data");
    console.log(dataFetched);
    setData(dataFetched);
  }
  const [data, setData] = useState<NavigationItem[]>();

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

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
                        introVideo={navItem.introVideo ?? ""}
                        postVoteVideo={navItem.postVoteVideo ?? ""}
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

          <Route path="privacy" element={<Privacy />} />
          <Route path="endingMembership" element={<EndingMembership />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
