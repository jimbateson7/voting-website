export interface QueryResult {
    data: Data
    errors:{}
}

export interface Data {
    navigationGroup: NavigationGroup
}

export interface NavigationGroup {
    navigationItemCollection: NavigationItemCollection
}

export interface NavigationItemCollection {
    items: NavigationItem[]
}

export enum NavTypes {
    VotingPage = "VotingPage",
    BlogPost = "BlogPost",
    NavigationGroup = "NavigationGroup",
    ExternalLink = "ExternalLink"
    
}

export interface NavigationItem {
    __typename: NavTypes
    introVideo?: string
    postVoteVideo?: string
    title?: string   
    "url"?:  string
    slug?: string
    sys?: Sys
}

export interface Sys {
    id: string
}
