import {getNavigationJson} from "../repositories/Navigation/request";
import React, {useCallback, useEffect, useState} from "react";
import {ContentTypes, NavigationItem} from "../repositories/Navigation/types";
import Nav from "react-bootstrap/Nav";
import {NavDropdown} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";

export type TDynamicNav = {
    id: string;
    onSelect?: () => {};
    itemGroup?: NavigationItem[];
    locale?: string;
};


export const DynamicNavList = (props: TDynamicNav) => {
    let {id, itemGroup, locale, onSelect} = props;

    const fetchData = useCallback(async () => {
        let dataFetched = await getNavigationJson(id, locale ?? "en");
        setData(dataFetched);
    }, [id])

    const [data, setData] = useState<NavigationItem[]>(itemGroup ?? []);

    useEffect(() => {
        if (!data.length)
            fetchData().catch(console.error);
    }, [fetchData]);

  
   
    
    const gslugPrefix = props.locale ? `${locale}/` :"";
    return (
        <>
            {data &&
                data.map((navItem: NavigationItem, index) => {
                    let slugPrefix = navItem.slug?.includes( gslugPrefix) ? "" : gslugPrefix;
                    if(navItem.slug?.startsWith("/") && slugPrefix?.endsWith("/"))
                        slugPrefix = props.locale ?? ""

                    const key =index +  (props.locale ?? "");

                    switch (navItem.__typename) {
                        case ContentTypes.ExternalLink:
                            return (
                                <a
                                    key={key}
                                    href={navItem.url ?? ""}
                                    className="nav-link"
                                    data-test="full link"
                                >
                                    {navItem.title}
                                </a>
                            );
                        case ContentTypes.VotingPage:
                            return (
                                <>
                                <Nav.Link onClick={onSelect} as={NavLink} key={key} to={slugPrefix  + (navItem.slug ?? "")}
                                          className="nav-link">
                                    {navItem.cardTitle}
                                </Nav.Link>
                                <Nav.Link onClick={onSelect} as={NavLink} key={key+"results"} to={ slugPrefix  +  "/results"}
                                          className="nav-link">
                                    Voting Results
                                </Nav.Link>
                                </>
                            );
                  
                        case ContentTypes.VideoPage:
                        case ContentTypes.BlogPost:
                            return (

                                <Nav.Link onClick={onSelect} as={NavLink} key={key} to={slugPrefix + (navItem.slug ?? "")}
                                          className="nav-link">
                                    {navItem.title}
                                </Nav.Link>
                            );
                        case ContentTypes.NavigationGroup:
                            return (
                                <NavDropdown key={key} title={navItem.title ?? "_"} id="basic-nav-dropdown">
                                    < DynamicNavList onSelect={onSelect} itemGroup={(navItem).navigationItem} locale={props.locale}
                                                    id={navItem?.id ?? "123"}></DynamicNavList>
                                </NavDropdown>
                            );
                        default:
                            return <></>;
                    }
                })}
        </>
    );
};  
