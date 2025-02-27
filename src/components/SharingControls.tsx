import React, {useEffect, useState} from "react";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaShareAlt,
    FaTwitter
} from "react-icons/fa";
import { Col, Row } from "react-bootstrap";

import "./SharingControls.scss";

export interface ISharingControls {
    voted: boolean;
    shareHeading: string;
    shareButtonText?: string;
    className?: string;
    mainQuestionText?: string;
}

export const SharingControls = ({shareHeading, mainQuestionText}: ISharingControls) => {
    const [linkAdded, setLinkAdded] = useState(false);
    
    useEffect(() => {
        if (linkAdded)
            return;

        const copyLink = document.getElementById('copy-link') as HTMLLinkElement;
        if(!copyLink)
            return;

        copyLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            // Get the link's href attribute
            const link = copyLink.href;

            navigator.share({url:link, title:mainQuestionText})

        });
        setLinkAdded(true);
    })

    function record(text: string) {}

    const openSocialWindow = (url: string) => {
        const left = (window.screen.width - 570) / 2;
        const top = (window.screen.height - 570) / 2;
        const params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
        window.open(url, "NewWindow", params);
    };
    
    const handleShare = (platform: string) => {
        const pageUrl = encodeURIComponent(window.location.href);
        let url = "";

        switch (platform) {
            case "facebook":
                url = `https://www.facebook.com/sharer.php?u=${pageUrl}`;
            break;
            case "twitter":
                url = `https://twitter.com/intent/tweet?url=${pageUrl}&text=Check this out!`;
            break;
            case "linkedin":
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
            break;
            case "instagram":
                url = `https://www.instagram.com/`;
            break;
            default:
            return;
        }

        openSocialWindow(url);
    };
    
    return (
        <>
            <Row className={"verticalFrameCentre justify-content-center "}>
                <h2>{shareHeading}</h2>
            </Row>

            <Row>
                <Col className={"squashToRow  sharingControls"}>
                    <div className={"verticalFrameCentre"}>
                        <a href="#" rel="noreferrer">
                            <FaFacebook onClick={(e) => { e.preventDefault(); handleShare("facebook")}} style={{color: '#4267B2', fontSize: '3rem', padding: '.25rem'}}/>
                        </a>

                        <a href="#" rel="noreferrer">
                            <FaTwitter onClick={(e) => { e.preventDefault(); handleShare("twitter")}} style={{color: '#1DA1F2', fontSize: '3rem', padding: '.25rem'}}/>
                        </a>

                        {
                            <a href="#" rel="noreferrer" className="auto-hide">
                                <FaLinkedin onClick={(e) => { e.preventDefault(); handleShare("linkedin")}} style={{color: '#2D62C1', fontSize: '3rem', padding: '.25rem'}}/>
                            </a>
                        }

                        <a href="#"rel="noreferrer" >
                            <FaInstagram onClick={(e) => { e.preventDefault(); handleShare("instagram")}} style={{fontSize: '3rem', padding: '.25rem'}}/>
                        </a>

                        <a id="copy-link" href="https://wwww.ourplanetourpeople.com">
                            <FaShareAlt onClick={() => record("Copy")}
                                    style={{color: '#C0C0C0'}}/>
                        </a>
                    </div>
                </Col>
            </Row>
        </>
    )
}