
import logo from "../logo.png";

import { Link, Outlet } from "react-router-dom";
import '@aws-amplify/ui-react/styles.css';
import "./Layout.scss";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { footerComponentId, headerComponentId } from "../Routing";
import {DynamicFooter} from "../components/DynamicFooter";
import React, {useEffect, useState} from "react";

import {DynamicNavList} from "../components/DynamicNavList";
import {CookieConsent} from "react-cookie-consent";

import { Analytics } from 'aws-amplify';
import {localStorageVotingIdKey} from "./VotingPage";


const Layout = () => {

    const [expanded, setExpanded] = useState(false);
    const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded);
    let userGuid = localStorage.getItem(localStorageVotingIdKey);
    
    
    useEffect( () => {
        let trackingAttributes = {
            userGuid: userGuid
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
            }});
    } , [analyticsEnabled]);
   
   
    if(analyticsEnabled)
        Analytics.enable()
    else
        Analytics.disable()


    return (
    <>
        
        <Navbar  expanded={expanded} collapseOnSelect expand="lg" variant="light" bg="light" fixed="top" >            
       <Container>
          <Link to="/" className="navbar-brand">
            <img
              alt="Our Planet Our People logo"
              src={logo}
              onClick={() => {setExpanded(false)}}
            />{" "}
          </Link>
          <Navbar.Toggle onClick={toggleExpanded} aria-controls="responsive-navbar-nav" />
           <Navbar.Collapse id="responsive-navbar-nav">
               <Nav className="me-auto">
                   <DynamicNavList id={headerComponentId} onSelect={() => {setExpanded(false)}}></DynamicNavList>
               </Nav>
           </Navbar.Collapse>
        </Container>
      </Navbar>

      <main>
        <Container>
           
            
          <Outlet />
           
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
      <DynamicFooter id={footerComponentId}></DynamicFooter>
       
    </>
  );
};

export default Layout;
