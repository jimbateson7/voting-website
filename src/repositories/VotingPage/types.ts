import {Video} from "react-datocms/dist/types/VideoPlayer";
import {TQuestionBlock} from "../Navigation/types";
import {StructuredTextDocument} from "react-datocms";
import {TVideoThumbnail} from "../Common/types";


export interface QueryResult {
    data: {votingPageModel:VotingPageData};
    errors: [];
}



export interface VotingPageData {
    id: string;
    questions?: TQuestionBlock[];
    videoThumbnail:{responsiveImage:{src:string}}

    donateText: {value: StructuredTextDocument};
    openingText: {value: StructuredTextDocument};
    mainVideo: { id: string, video: Video };
    postVoteVideo: { id: string, video: Video };
    postThankYou: { id: string, video: Video };    
    cardTitle?: string;

    thankYouVideo: TVideoThumbnail;
    detailVideo: TVideoThumbnail;
    landingVideo: TVideoThumbnail;

    proposition1: TVideoThumbnail;
    proposition2: TVideoThumbnail;
    proposition3: TVideoThumbnail;
   
    heading?: string;
    showVoteStatistics?: boolean;
    introductionText?: string;
    
    shareHeading?: string;
    shareSubheading?: string;
    title?: string;
    url?: string;
    slug?: string; 
    
}

