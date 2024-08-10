import {FaEnvelope, FaExternalLinkAlt, FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from "react-icons/fa";
import React from "react";

export interface ISharingControls {
    voted: boolean;
    shareHeading: string;
}

export const SharingControls = ({voted, shareHeading}: ISharingControls) => {
    //todo
    function record(text: string) {


    }

    return (<>
        <h2 id="share-heading" className={voted ? "voted" : ""}>{shareHeading}</h2>

        <div className="social-links">
            <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//ourplanetourpeople.com" target="_blank"
               rel="noreferrer">
                <FaFacebook onClick={() => record("Facebook")}
                            style={{color: '#4267B2', fontSize: '3rem', padding: '.25rem'}}/>
            </a>

            <a href="https://twitter.com/intent/tweet?text=Should%20our%20action%20plans%20be%20based%20on%20responding%20to%20worst%20case%20scenarios?%20Cast%20your%20vote%20at%20https%3A//ourplanetourpeople.com"
               target="_blank" rel="noreferrer">
                <FaTwitter onClick={() => record("Twitter")}
                           style={{color: '#1DA1F2', fontSize: '3rem', padding: '.25rem'}}/>
            </a>

            <a href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A//ourplanetourpeople.com"
               target="_blank"
               rel="noreferrer">
                <FaLinkedin onClick={() => record("LinkedIn")}
                            style={{color: '#2D62C1', fontSize: '3rem', padding: '.25rem'}}/>
            </a>

            <a href="https://www.instagram.com/">
                <FaInstagram onClick={() => record("Instagram")} style={{fontSize: '3rem', padding: '.25rem'}}/>
            </a>

            <a href="mailto:?subject=Should%20our%20action%20plans%20be%20based%20on%20responding%20to%20worst%20case%20scenarios?&body=Cast%20your%20vote%20at%20https%3A//ourplanetourpeople.com">
                <FaEnvelope onClick={() => record("Email")}
                            style={{color: '#F5BA48', fontSize: '3rem', padding: '.25rem'}}/>
            </a>

            <a id="copy-link" href="http://wwww.ourplanetourpeople.com">
                <FaExternalLinkAlt onClick={() => record("Copy")}
                                   style={{color: '#F5BA48', fontSize: '3rem', padding: '.25rem'}}/>
            </a>
        </div>
    </>)

}