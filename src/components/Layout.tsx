﻿import logo from "../logo.png";

import {Link, Outlet} from "react-router-dom";
import '@aws-amplify/ui-react/styles.css';
import "./Layout.scss";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {footerComponentId, headerComponentId} from "../Routing";

import React, {PropsWithChildren, useEffect, useState} from "react";


import {CookieConsent, getCookieConsentValue} from "react-cookie-consent";

import {Analytics} from 'aws-amplify';

import {v4 as generateGuid} from "uuid";
import {DisableAnalytics, EnableAnalytics, recordUse} from "../utils/analytics";

import {localStorageVotingIdKey} from "../pages/VotingPage";
import {DynamicNavList} from "./DynamicNavList";
import {DynamicFooter} from "./DynamicFooter";
import {defaultLanguage} from "../languages";
import FlagSelect from "./FlagSelect";


export interface ILayout extends PropsWithChildren
{
    locale:string;
}

export const LayoutTs = ({children, locale} : ILayout) => {
    
    
    const [expanded, setExpanded] = useState(false);
    const [analyticsEnabled, setAnalyticsEnabled] = useState(getCookieConsentValue("OurPeopleOurPlanetAnalyticsAcceptance") ?? false);
    
   
    const toggleExpanded = () => setExpanded(!expanded);

    
    
    useEffect(() => {
    }, [locale])
    {
        //console.log(getCookieConsentValue("OurPeopleOurPlanetAnalyticsAcceptance"));
        //InitAnalytics();
    }
    useEffect(() => {
        let userGuid = localStorage.getItem(localStorageVotingIdKey);
        if (!userGuid || userGuid.length < 1) {
            userGuid = generateGuid();
            localStorage.setItem(localStorageVotingIdKey, userGuid);
        }
        let trackingAttributes = {
            userId: userGuid
        }
           

        Analytics.autoTrack('pageView', {
            enable: analyticsEnabled,
            autoSessionRecord: analyticsEnabled,
            eventName: 'pageView',
            attributes: trackingAttributes,

            type: 'multiPageApp',
            provider: 'AWSPinpoint',

            getUrl: () => {
                // the default function
                return window.location.origin + window.location.pathname;
            }
        });


        recordUse({name: "Page_View", attributes: {page: window.location.pathname, userGuid}});
    }, [analyticsEnabled]);

    if (analyticsEnabled)
        EnableAnalytics()
    else
        DisableAnalytics();


    return (
        <>

            <Navbar expanded={expanded} collapseOnSelect expand="lg" fixed="top">
                <Container style={{position: "relative"}}>
                    <Link to="/" className="navbar-brand">
                        <img
                            alt="Our Planet Our People"
                            src={logo}
                            onClick={() => {
                                setExpanded(false)
                            }}
                        />
                    </Link>
                    <Navbar.Toggle onClick={toggleExpanded} aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <DynamicNavList id={headerComponentId} locale={locale} onSelect={() => {
                                setExpanded(false)
                                return {}
                            }}></DynamicNavList>
                            <FlagSelect currentLocale={locale ?? defaultLanguage}></FlagSelect>

                        </Nav>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            
            <main>
                {children}
                <Container>

                    
                    <Outlet/>

                </Container>

            </main>
            <CookieConsent
                location="bottom"
                buttonText="Ok I Accept"
                cookieName="OurPeopleOurPlanetAnalyticsAcceptance"
                declineButtonText={"No Thank You"}
                // buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                // declineButtonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150}
                enableDeclineButton
                onDecline={() => {
                    setAnalyticsEnabled(false)
                }}
                onAccept={(acceptedByScrolling) => {

                    setAnalyticsEnabled(true)
                }}
            >
                This website uses cookies to enhance the user experience.{" "}

            </CookieConsent>
            <DynamicFooter id={footerComponentId} locale={locale}></DynamicFooter>
          

        </>
    );
};


