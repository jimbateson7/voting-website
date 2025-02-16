import {useState} from "react";
import {Col, Row} from "react-bootstrap";
import {TVideoProps, VideoControl} from "../components/VideoControl";
import {TReferenceProps, VideoReferenceControl} from "../components/VideoReferenceControl";

type TVideoReference = TReferenceProps & TVideoProps;

export const VideoWithReference = (props: TVideoProps) => {

    const [timeStamp, setTimeStamp] = useState<number>(0);

    return (
        <Row>
            <Col xs={12} md={8} className="video-column" style={{marginLeft:props.leftShift}}>
                <VideoControl {...props} onProgress={setTimeStamp}  />
            </Col>
            <Col xs={12} md={4} className="reference-column" style={{marginLeft:-60}}>
                <VideoReferenceControl currentTimeStamp={timeStamp} />
            </Col>
        </Row>
    )
}