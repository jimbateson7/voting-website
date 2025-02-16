import {Video} from "react-datocms/dist/types/VideoPlayer";
import {TQuestionBlock} from "../Navigation/types";
import {StructuredTextDocument} from "react-datocms";


export interface QueryResult {
    data: {votingPageModel:VotingPageData};
    errors: [];
}

export interface TVideoThumbnail {
    thumbnailImage: {responsiveImage: {src: string}};
    video: { id: string, video: Video };
}

export interface VotingPageData {
    id: string;
    questions?: TQuestionBlock[];
    videoThumbnail:{responsiveImage:{src:string}}

    donateText: {value: StructuredTextDocument};
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
    shareSubHeading?: string;
    title?: string;
    url?: string;
    slug?: string; 
    
}

