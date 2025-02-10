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
    VotingResult = "VotingResultModelRecord",
    
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

    mainVideo: { id: string, video:{video: Video | undefined} } | undefined;
    
    videoThumbnail: { responsiveImage: { src: string } };
    cardTitle: string;
    title: string;
    url: string;
    id: string;
    slug: string;
    __typename: ContentTypes
    showVideoThumbnailsInHub?: boolean
    
}

