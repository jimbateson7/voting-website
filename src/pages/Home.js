import VoteControls from '../components/VoteControls';
import Share from '../components/Share';
import './Home.scss';

const Home = () => {

    return (
        <div className="home">
            <iframe
                className="video"
                src="https://www.youtube.com/embed/HkZk-E8kHx0" // ?autoplay=1
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
            </iframe>

            <h1 className={"h1"}>Should our action plans be based on responding to worst case scenarios?</h1>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10rem', width: '50%', margin: '2rem auto', border: '1px solid black' }}>
                VOTE COMPONENT
                {/*<VoteControls />*/}
            </div>
            
            <Share />
        </div>
    )
};

export default Home;