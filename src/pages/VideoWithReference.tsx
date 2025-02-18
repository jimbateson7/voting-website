import {useRef, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {TVideoProps, VideoControl} from "../components/VideoControl";
import {TReferenceProps, VideoReferenceControl} from "../components/VideoReferenceControl";

type TVideoReference = TReferenceProps & TVideoProps;

export const VideoWithReference = (props: TVideoProps) => {

    const [timeStamp, setTimeStamp] = useState<number>(0);

    const rowReference = useRef(null);
    const videoColReference = useRef(null);
    const sideColReference = useRef(null);
   

    
    
    return (
        <Row className={"video-reference-control"} ref={rowReference}>
            <Col xs={12} md={8} className="video-column" style={{marginLeft:props.leftShift}} ref={videoColReference}>
                <VideoControl {...props} onProgress={setTimeStamp}  />
            </Col>
            <Col xs={12} md={4} className="reference-column" ref={sideColReference}>
                <VideoReferenceControl currentTimeStamp={timeStamp} videoColReference={videoColReference} rowReference={rowReference} sideBarColReference={sideColReference} />
            </Col>
        </Row>
    )
}