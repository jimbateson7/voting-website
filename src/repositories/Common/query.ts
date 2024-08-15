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
                muxPlaybackId
                title
                width
                height
                blurUpThumb
                
              }
              
              
            }  
            videoThumbnail 
                {
                  responsiveImage
                  {
                    src
                  }
                }
            video{ytembedUrl,autoPlay,title}`;

const votingPage = ` 
            cardTitle,  
            showVoteStatistics,
            videoThumbnail {
                   responsiveImage
                  {
                    src
                  }
                }
            introVideo{url}
            shareHeading,
            slug,
            questions {
                ... on QuestionRecord {  id,   questionTitleSt {   value}}
            }
             mainVideo {
              id,
               video {
                muxPlaybackId
                title
                width
                height
                blurUpThumb
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

