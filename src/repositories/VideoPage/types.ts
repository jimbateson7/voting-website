
export interface QueryResult {
  data: Data;
  errors: [];
}

export interface Data {
  allVideoPageModels: VideoItem[]
}


export interface VideoItem {
  sys: Sys
  __typename: string
  slug: string
  title: string
  introText?: string,
  video:Video
}

export interface Sys {
  id: string
}

export interface Video {
  ytembedUrl: string
  autoPlay: boolean
  title: string
}
