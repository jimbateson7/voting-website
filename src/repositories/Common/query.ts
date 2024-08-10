//generate by
//https://app.contentful.com/spaces/fojlfyn3xufg/environments/staging/entries/1n9FMvYa8MWstVI19atW2w
//graphqlplayground
//2EASI81WCZEAsg9bRP370U

const blogPost = `title
            slug`;

const videoPage = `title
            slug
            mainVideo {
              id,
              video {
                      streamingUrl
                      mp4High: mp4Url(res: high)
                      mp4Med: mp4Url(res: medium)
                      mp4Low: mp4Url(res: low)
                      duration
                      framerate
                      thumbJpg: thumbnailUrl(format: jpg)
                      thumbPng: thumbnailUrl(format: png)
                      thumbGif: thumbnailUrl(format: gif)
                    }
              
            }  
            video{ytembedUrl,autoPlay,title}`;

const votingPage = ` 
            cardTitle,  
            showVoteStatistics,
            introVideo,
            shareHeading,
            slug,
            questions {
                ... on QuestionRecord { questionTitle, id}
            }
             mainVideo {
              id,
              video {
                      streamingUrl
                      mp4High: mp4Url(res: high)
                      mp4Med: mp4Url(res: medium)
                      mp4Low: mp4Url(res: low)
                      duration
                      framerate
                      thumbJpg: thumbnailUrl(format: jpg)
                      thumbPng: thumbnailUrl(format: png)
                      thumbGif: thumbnailUrl(format: gif)
                    }
              
            }  

            `;

const basicNavItems = `
          __typename
          ... on VideoPageModelRecord {
            ${videoPage}
          }
          ... on BlogPostModelRecord {
            ${blogPost}
          }
              
          ... on VotingPageModelRecord{
            ${votingPage}
          }`

export const QueryBlocks =
{
    BasicNavigationItems: basicNavItems,
    BlogPost: blogPost,
    VideoPost: videoPage,
    VotingPage: votingPage,
}

