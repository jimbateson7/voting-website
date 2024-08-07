import React, {useEffect} from "react";
import "./Donation.scss";
import WhyDonate from "./WhyDonateEmbed";
import {Button} from "react-bootstrap";

const Donation = () => {


    const whyDontate = true;
    return whyDontate ?
                (<>                
                
                    <WhyDonate></WhyDonate>
                </>)
                :
                (<>

                    <iframe className="gfm-embed-iframe gofundme"
                            src="https://www.gofundme.com/f/nrtaab-we-need-to-know/widget/medium/#:~:tcm-regime=GDPR&tcm-prompt=Hidden"
                            title="W3Schools Free Online Web Tutorials"></iframe>

                </>)
        
};


export default Donation