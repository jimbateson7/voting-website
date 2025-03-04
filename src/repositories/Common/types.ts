import {NavigationItem} from "../Navigation/types";
import {Video} from "react-datocms/dist/types/VideoPlayer";

export interface QueryResult {
    data: Data
    errors: {}
}

export interface TVideoThumbnail {
    thumbnailImage: {responsiveImage: {src: string}};
    video: { id: string, video: Video };
}
export interface Data {
    allVideoPageModels: NavigationItem[]
    allBlogPostModels: NavigationItem[];
    votingPageModel: NavigationItem;
}

export type TArticlePage = {
    slug: string;
    title?: string;
    locale: string;
};


