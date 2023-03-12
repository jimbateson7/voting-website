import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import './Share.scss';

function Share({ postVoteVideo, shareText, shareSubText }) {
  
  return (
    <div className="share">

      {postVoteVideo ? 
      <iframe
        className="video"
        src={postVoteVideo} // TODO: Should this auto-play when component loads after vote? If so, append "?autoplay=1" to URL
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe> : null }

      <h2>{shareText}</h2>
      <p>{shareSubText}</p>
      <div className="social-links">
        <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//ourplanetourpeople.com" target="_blank" rel="noreferrer">
          <FaFacebook style={{ color: '#4267B2', fontSize: '3rem', padding: '.25rem' }} />
        </a>

        <a href="https://twitter.com/intent/tweet?text=Should%20our%20action%20plans%20be%20based%20on%20responding%20to%20worst%20case%20scenarios?%20Cast%20your%20vote%20at%20https%3A//ourplanetourpeople.com" target="_blank" rel="noreferrer">
          <FaTwitter style={{ color: '#1DA1F2', fontSize: '3rem', padding: '.25rem' }} />
        </a>

        <a href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A//ourplanetourpeople.com" target="_blank" rel="noreferrer">
          <FaLinkedin style={{ color: '#2D62C1', fontSize: '3rem', padding: '.25rem' }} />
        </a>

        <a href="https://www.instagram.com/">
          <FaInstagram style={{ fontSize: '3rem', padding: '.25rem' }} />
        </a>

        <a href="mailto:?subject=Should%20our%20action%20plans%20be%20based%20on%20responding%20to%20worst%20case%20scenarios?&body=Cast%20your%20vote%20at%20https%3A//ourplanetourpeople.com">
          <FaEnvelope style={{ color: '#F5BA48', fontSize: '3rem', padding: '.25rem' }} />
        </a>
      </div>
    </div>
  );
}

export default Share;