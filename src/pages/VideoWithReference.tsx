import {useRef, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {TVideoProps, VideoControl} from "../components/VideoControl";
import {TReferenceProps, VideoReferenceControl} from "../components/VideoReferenceControl";

type TVideoReference = TReferenceProps & TVideoProps;

export const VideoWithReference = (props: TVideoReference) => {

    const [timeStamp, setTimeStamp] = useState<number>(props.currentTimeStamp);

   
    
    return (
        <Row className={"video-reference-control"}>
            <Col xs={12} md={8} className="video-column" style={{marginLeft:props.leftShift}}>
                <VideoControl {...props} onProgress={setTimeStamp}  />
            </Col>
            <Col xs={12} md={4} className="reference-column" >
                <VideoReferenceControl currentTimeStamp={timeStamp} references={props.references} />
            </Col>
        </Row>
    )
}