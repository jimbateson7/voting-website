import {Video} from "react-datocms/dist/types/VideoPlayer";
import {StructuredTextDocument} from "react-datocms";


export interface QueryResult {
    data: Data
    errors: {}
}

export interface Data {
    allNavigationGroupModels: NavigationItem[]
}

export interface NavigationGroup {
    navigationItem: NavigationItem[]
}

export enum ContentTypes {
    VotingPage = "VotingPageModelRecord",
    BlogPost = "BlogPostModelRecord",
    VideoPage = "VideoPageModelRecord",
    NavigationGroup = "NavigationGroupModelRecord",
    ExternalLink = "ExternalLinkModelRecord",

}

export enum AssetTypes {
    YoutubeVideoEmbed = "YoutubeVideoEmbed",
    GenericImage = "GenericImage",
}

export interface BasePage {
    __typename: ContentTypes
    slug: string
    title: string
}

export interface TQuestionBlock {

    id: string,
    questionTitleSt: {value: StructuredTextDocument};
}

export interface NavigationItem extends NavigationGroup {
    __typename: ContentTypes
    showVideoThumbnailsInHub?: boolean
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

