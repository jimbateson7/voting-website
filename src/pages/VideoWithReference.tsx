import {useRef, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {TVideoProps, VideoControl} from "../components/VideoControl";
import {TReferenceProps, VideoReferenceControl} from "../components/VideoReferenceControl";

type TVideoReference = TReferenceProps & TVideoProps;

export const VideoWithReference = (props: TVideoProps) => {

    const [timeStamp, setTimeStamp] = useState<number>(0);

    const videoReferenceControlRef = useRef(null);
   

    
    
    return (
        <Row className={"video-reference-control"} ref={videoReferenceControlRef}>
            <Col xs={12} md={8} className="video-column" style={{marginLeft:props.leftShift}} >
                <VideoControl {...props} onProgress={setTimeStamp}  />
            </Col>
            <Col xs={12} md={4} className="reference-column" style={{marginLeft:-60}}>
                <VideoReferenceControl currentTimeStamp={timeStamp} videoReferenceControlRef={videoReferenceControlRef} />
            </Col>
        </Row>
    )
}