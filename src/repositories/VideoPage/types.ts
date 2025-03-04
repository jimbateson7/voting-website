import {Video} from "react-datocms/video-player";
import {TVideoThumbnail} from "../Common/types";

export interface QueryResult {
    data: Data;
    errors: [];
}

export interface Data {
    allVideoPageModels: VideoItem[]
}


export interface VideoItem {

    mainVideo: TVideoThumbnail,//{ id: string, video:{video: Video | undefined} } | undefined;
    sys: Sys
    __typename: string
    slug: string
    title: string
    introText?: string,
    video: { ytembedUrl: string, autoPlay: boolean, title: string }
    videoThumbnail:{responsiveImage:{src:string}}
}

export interface Sys {
    id: string
}


