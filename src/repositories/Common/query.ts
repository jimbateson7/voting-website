//generate by
//https://app.contentful.com/spaces/fojlfyn3xufg/environments/staging/entries/1n9FMvYa8MWstVI19atW2w
//graphqlplayground
//2EASI81WCZEAsg9bRP370U

const blogPost = `title
            slug`;



const videoBlock = `{
                   id,
                   video {
                    muxPlaybackId
                    title
                    width
                    height
                    blurUpThumb
                  }
              }`

const imgBlock = `{responsiveImage
        {src}}`;

const videoPage = `
                id
                slug
                title
                mainVideo{
                video${videoBlock}
                thumbnailImage${imgBlock}
                }    
            `;
const votingPage = ` 
            id
            cardTitle,  
            showVoteStatistics,
            videoThumbnail {
                   responsiveImage
                  {
                    src
                  }
                }
            landingVideo{
                video${videoBlock}
                thumbnailImage${imgBlock}
            }
             detailVideo{
                video${videoBlock}
                thumbnailImage${imgBlock}
            }
             thankYouVideo{
                video${videoBlock}
                thumbnailImage${imgBlock}
            }
            
            shareHeading,
            donateText{value},
            slug,
            questions {
                ... on QuestionRecord {  id,   questionTitleSt {   value}}
            }
            postThankYou${videoBlock}
            postVoteVideo${videoBlock}
            mainVideo${videoBlock}
            
            agreeVoteText,
            disagreeVoteText,
                
              
            

            `;

const basicNavItems = `
          __typename
          
          ... on VideoPageModelRecord {
            title
               id 
               slug
               mainVideo{video${videoBlock}}
          }
          ... on BlogPostModelRecord {
             title
            slug
            id
          }
              
          ... on VotingPageModelRecord{
            cardTitle
            id
          }`

export const QueryBlocks =
    {
        BasicNavigationItems: basicNavItems,
        BlogPost: blogPost,
        VideoPost: videoPage,
        VotingPage: votingPage,
        VideoComponent: videoPage,
    }

