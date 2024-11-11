import {Video} from "react-datocms/dist/types/VideoPlayer";
import {TQuestionBlock} from "../Navigation/types";
import {StructuredTextDocument} from "react-datocms";


export interface QueryResult {
    data: {votingPageModel:VotingPageData};
    errors: [];
}

export interface VotingPageData {
    id: string;
    questions?: TQuestionBlock[];
    videoThumbnail:{responsiveImage:{src:string}}
    agreeVoteText: string;
    disagreeVoteText: string;
    donateText: {value: StructuredTextDocument};
    mainVideo: { id: string, video: Video };
    postVoteVideo: { id: string, video: Video };
    
    cardTitle?: string;
   
    heading?: string;
    showVoteStatistics?: boolean;
    introductionText?: string;
    
    shareHeading?: string;
    shareSubHeading?: string;
    title?: string;
    url?: string;
    slug?: string; 
    
}

