import { Video } from "react-datocms/video-player";

export interface QueryResult {
  data: Data;
  errors: [];
}

export interface Data {
  allVideoPageModels: VideoItem[]
}


export interface VideoItem {
  mainVideo:{id:string, video:Video | undefined};
  sys: Sys
  __typename: string
  slug: string
  title: string
  introText?: string,
  video:{ytembedUrl:string,autoPlay:boolean,title:string}
}

export interface Sys {
  id: string
}


