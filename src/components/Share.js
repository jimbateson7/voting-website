import {FaFacebook, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaExternalLinkAlt} from 'react-icons/fa';
import './Share.scss';
import {localStorageVotingIdKey} from "../pages/VotingPage";
import {recordUse} from "../utils/analytics";
import {useEffect, useState} from "react";

function Share({ postVoteVideo, shareText, shareSubText, voted }) {


  const record = (socialMedia) =>
  {
    let userGuid = localStorage.getItem(localStorageVotingIdKey);
    const attributes = {
      userId: `${userGuid ?? ""}`,
      page: "Voting Page",
      socialMediaUsed:socialMedia,
    }
    
    recordUse({
      name: `Share_Button_Clicked`,      
      attributes: attributes
    },userGuid);
  }
  
  const [linkAdded, setLinkAdded] = useState(false);
  
  useEffect(() =>
  {
      if(linkAdded)
          return;
      
      const copyLink = document.getElementById('copy-link');

      copyLink.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default link behavior

          // Get the link's href attribute
          const link = copyLink.href;

          // Create a temporary text area to hold the link
          const tempInput = document.createElement('textarea');
          tempInput.value = link;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);



          // Provide feedback to the user (optional)
          alert('Link copied to clipboard!');
      });
      setLinkAdded(true);
  })
  
  
  return (
      <div className="share">

          {postVoteVideo ?
              <iframe
                  id="main-video"
                  className="video"
                  src={postVoteVideo} // TODO: Should this auto-play when component loads after vote? If so, append "?autoplay=1" to URL
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
              ></iframe> : null}

          <br/>
          <br/>
          <br/>
          <br/>
          <br/>


      </div>
  );
}

export default Share;