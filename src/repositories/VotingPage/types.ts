import {Video} from "react-datocms/dist/types/VideoPlayer";
import {TQuestionBlock} from "../Navigation/types";


export interface QueryResult {
    data: {votingPageModel:VotingPageData};
    errors: [];
}

export interface VotingPageData {
    introVideo?: {url:string}

    cardTitle?: string;
    postVoteVideo?: string
    heading?: string;
    showVoteStatistics?: boolean;
    introductionText?: string;
    votingThankYou?: string;
    votingPostVoteExplanation?: string;
    shareHeading?: string;
    shareSubHeading?: string;
    title?: string
    url?: string
    slug?: string
    video?: { ytembedUrl: string, title: string }
    id: string;
    questions?: TQuestionBlock[];
    mainVideo: { id: string, video: Video };
    videoThumbnail:{responsiveImage:{src:string}}
}

