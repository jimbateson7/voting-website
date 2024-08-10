import {Video} from "react-datocms/dist/types/VideoPlayer";


export interface QueryResult {
    data: Data
    errors:{}
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
export enum AssetTypes
{
    YoutubeVideoEmbed = "YoutubeVideoEmbed",
    GenericImage =  "GenericImage",
}

export interface BasePage
{
    __typename: ContentTypes
    slug: string
    title: string
}

export interface TQuestionBlock
{
    questionTitle:string,
    id:string,
}

export interface NavigationItem extends NavigationGroup {
    __typename: ContentTypes 
    showVideoThumbnailsInHub?: boolean
    introVideo?: string
    cardTitle?:string;
    postVoteVideo?: string
    heading?: string;
    showVoteStatistics?: boolean;
    introductionText?: string;
    votingThankYou?: string;
    votingPostVoteExplanation?: string;
    shareHeading?: string;
    shareSubHeading?: string;
    title?: string   
    url?:  string
    slug?: string
    video?:Video
    id:string;
    questions?: TQuestionBlock[];
    mainVideo:{id:string, video:Video};
}

