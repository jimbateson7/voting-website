import {
    FaEnvelope,
    FaExternalLinkAlt,
    FaFacebook,
    FaInstagram,
    FaLink,
    FaLinkedin,
    FaShare, FaShareAlt,
    FaTwitter
} from "react-icons/fa";
import React from "react";
import { Col, Row } from "react-bootstrap";
import "./SharingControls.scss";

export interface ISharingControls {
    voted: boolean;
    shareHeading: string;
    shareButtonText?: string;
}

export const SharingControls = ({voted, shareHeading, shareButtonText}: ISharingControls) => {
    //todo
    function record(text: string) {


    }

    let twitterShareText = "";

    try {
        twitterShareText = shareButtonText ? encodeURIComponent(shareButtonText) : "";
    } catch (e) {
        console.log(e);
    }

    const emailSubject = twitterShareText;

    return (<>
        <Row className={"flexShare"}>
            <Col className={"squashToRow flexGrow"}><p  className={voted ? "voted" : ""}>{shareHeading}</p></Col>

            <Col className={"squashToRow spaceEven"}>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//ourplanetourpeople.com" target="_blank"
               rel="noreferrer">
                <FaFacebook onClick={() => record("Facebook")}
                            style={{color: '#4267B2', fontSize: '3rem', padding: '.25rem'}}/>
            </a>

            <a href={`https://twitter.com/intent/tweet?text=${twitterShareText}`}
               target="_blank" rel="noreferrer">
                <FaTwitter onClick={() => record("Twitter")}
                           style={{color: '#1DA1F2', fontSize: '3rem', padding: '.25rem'}}/>
            </a>
            {
            <a href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A//ourplanetourpeople.com"
               target="_blank"
               rel="noreferrer" className="auto-hide">
                <FaLinkedin onClick={() => record("LinkedIn")}
                            style={{color: '#2D62C1', fontSize: '3rem', padding: '.25rem'}}/>
            </a>
            
            }

            <a href="https://www.instagram.com/" >
                <FaInstagram onClick={() => record("Instagram")} style={{fontSize: '3rem', padding: '.25rem'}}/>
            </a>

            {/*
            <a href={`mailto:?subject=${emailSubject}`}>
                <FaEnvelope onClick={() => record("Email")}
                            style={{color: '#F5BA48', fontSize: '3rem', padding: '.25rem'}}/>
            </a>
*/
            }
            <a id="copy-link" href="http://wwww.ourplanetourpeople.com">
                <FaShareAlt onClick={() => record("Copy")}
                        style={{color: '#C0C0C0'}}/>
            </a>
            </Col>
        </Row>
    </>)

}