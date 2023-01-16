import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import './Share.scss';

function Share() {

	return (
		<div className="share">
			<h2>Please share</h2>
			<div className="social-links">
				<Link to="https://www.facebook.com/sharer/sharer.php?u=https%3A//ourplanetourpeople.com">
					<FaFacebook style={{ color: '#4267B2', fontSize: '3rem', padding: '.25rem' }} />
				</Link>

				<Link to="https://twitter.com/intent/tweet?text=Should%20our%20action%20plans%20be%20based%20on%20responding%20to%20worst%20case%20scenarios?%20Cast%20your%20vote%20at%20https%3A//ourplanetourpeople.com">
					<FaTwitter style={{ color: '#1DA1F2', fontSize: '3rem', padding: '.25rem' }} />
				</Link>

				<Link to="https://www.linkedin.com/shareArticle?mini=true&url=https%3A//ourplanetourpeople.com">
					<FaLinkedin style={{ color: '#2D62C1', fontSize: '3rem', padding: '.25rem' }} />
				</Link>

				<Link to="#">
					<FaInstagram style={{ fontSize: '3rem', padding: '.25rem' }} />
				</Link>

				<Link to="#">
					<FaWhatsapp style={{ color: '#25D366', fontSize: '3rem', padding: '.25rem' }} />
				</Link>

				<Link to="mailto:test@test.com?subject=Should%20our%20action%20plans%20be%20based%20on%20responding%20to%20worst%20case%20scenarios?&body=Cast%20your%20vote%20at%20https%3A//ourplanetourpeople.com">
					<FaEnvelope style={{ color: '#F5BA48', fontSize: '3rem', padding: '.25rem' }} />
				</Link>
			</div>
		</div>
	);
}

export default Share;