import React, {useEffect, useState} from "react";

import "./App.scss";

import {ContentTypes, NavigationItem} from "./repositories/Navigation/types";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import VotingPage, {localStorageVotingIdKey, localStorageWatchedIdKey} from "./pages/VotingPage";

import NoPage from "./pages/NoPage";
import LoadingPage from "./pages/LoadingPage";
import {DEBUG_QUERY, refreshPreview} from "./repositories/utils/preview";
import {LogLinks} from "./repositories/utils/utilities";

import {getAllNavData} from "./repositories/Common/request";
import {BlogList} from "./components/BlogList";
import {defaultLanguage, getSupportedLocales} from "./languages";
import {LayoutTs} from "./components/Layout";
import {RouteChangeListener} from "./RouteChangeListener";
import {VideoPage} from "./pages/VideoPage";
import {ArticlePage} from "./pages/Article";
import {VotingResultsFrame} from "./pages/VotingResultsFrame";


export const headerComponentId = "UW2LLARmS3Oryu_9BT0IBQ"; //todo this is a bit rubbish
export const footerComponentId = "QR1NY2zlRK-luRZZkbfB1w";  


const Reset = () => {

    useEffect(() => {

        localStorage.removeItem(localStorageVotingIdKey)
        localStorage.removeItem(localStorageWatchedIdKey)
        const statusElement = document.getElementById("status");
        if (statusElement) {
            statusElement.innerHTML = "Done";
        }
    })


    return <div role="status">
        <span id="status">Loading...</span>
    </div>;
};



function Routing() {

    const [data, setData] = useState<NavigationItem[]>();
    const [dataLoaded, setDataLoaded] = useState(false);
    
    async function fetchData() {

    
        let links = await getAllNavData(); //todo we should probably just split this into the 3 arrays, save switching on typename below

        if (process.env.NODE_ENV === "development" && DEBUG_QUERY) {
            LogLinks(links, "routing");
        }
  
        setData(links);
        setDataLoaded(true);
       
    }

    


    refreshPreview();

    useEffect(() => {
        fetchData().catch(console.error);
    }, []);


    const createDynamicRoutes = (lang:string | undefined, uid:number) => {
        const prefix = lang ? `${lang}/` : '';
        const locale = lang ?? defaultLanguage;
      
        return (
            <>
                {data &&
                    data.map((navItem, index) => {
                        const keyId =uid + "-" + locale + "-" + index
                        switch (navItem.__typename) {
                            case ContentTypes.VotingPage:
                          
                                return (
                                    <>
                                    <Route
                                        key={keyId}

                                        path={prefix + "/"}
                                        index
                                        element={
                                      
                                            <VotingPage
                                                id={navItem.id}
                                                locale={locale}
                                            />
                                       
                                        }
                                    />
                                        <Route
                                            key={keyId+"results"}

                                            path={prefix + "results"}
                                            
                                            element={
                                           
                                                <VotingResultsFrame
                                                    questionId={"UwO6qO8AQL2tLD7tBPGP7A"}
                                                />
                                             
                                            }
                                        />
                            </>
                                );

                            case ContentTypes.BlogPost:

                                return (
                                    <Route
                                        key={keyId}

                                        path={prefix + navItem.slug ?? "blog"}
                                        element={
                                      
                                        <ArticlePage locale={locale} slug={navItem.slug ?? "blog"}/>
                                           }
                                    />
                                );
                            case ContentTypes.VideoPage:
                                return (
                                    <Route
                                        key={keyId}
                                        path={prefix + navItem.slug ?? "video"}
                                        element={<VideoPage locale={locale} slug={prefix + navItem.slug ?? "video"}/>}
                                    />
                                );

                            default:
                                return null;
                        }
                    })}
                <Route

                    key={prefix + "blog_list"}
                    path={prefix +"blog_list"}
                    element={<BlogList locale={locale}/>}
                />
            </>
        );
    };

    const [locale, setLocale] = useState(defaultLanguage);
   
    const OnLocaleChanged = (locale:string) =>
    {        
        setLocale(locale)
    }
    return (
        <BrowserRouter>
            <Routes>
                
                
                <Route key="root" path={"/"}   element={<LayoutTs locale={locale} ><RouteChangeListener onSetLocale={OnLocaleChanged}/></LayoutTs>} >
                    
                    {[undefined, ...getSupportedLocales()].map((locale,index) => createDynamicRoutes(locale,index))}
                    {dataLoaded ? <Route key="loading" path="*" element={<LoadingPage/>}/> : <Route key="nopage" path="*" element={<NoPage/>}/>}
                    <Route key="api" path="/reset/patrickonly/277205bc-fdf9-4bcb-be07-14a3a3bcc7f4" element={<Reset/>}></Route>
                </Route>)
                   
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
