import {QueryResult} from "./types";

import {TVotingPage} from "../../pages/VotingPage";
import {extractYoutubeVideoId} from "../utils/utilities";

export async function mapVotingPage(result: QueryResult): Promise<TVotingPage> {

    
    const votingPage = result?.data?.votingPageModel;
    

    if (!votingPage) {
        throw new Error("no voting data");
    }
    const data:TVotingPage =
        {
           /* introText: votingPage.introductionText ?? "",
            heading: votingPage.heading,
            introVideoId: votingPage.introVideo?.url,
            mainVideo:  votingPage.mainVideo,
            postVoteVideoId: votingPage.postVoteVideo,
            questions: votingPage.questions,
            shareHeading: votingPage.shareHeading,
            shareSubHeading: votingPage.shareSubHeading,
            showIntroVideo: false,
            showSharePanel: false,
            showStatistics: votingPage.showVoteStatistics ?? false,
            videoThumbnail: votingPage.videoThumbnail,
            votingPostVoteExplanation: votingPage.votingPostVoteExplanation,
            votingThankYou: votingPage.votingThankYou,*/

            heading: votingPage.heading,
            introVideoId: extractYoutubeVideoId(votingPage.introVideo?.url),
            postVoteVideoId: extractYoutubeVideoId(
                votingPage.postVoteVideo
            ),
            showStatistics: votingPage.showVoteStatistics ?? false,
            introText: votingPage.introductionText ?? "",
            votingThankYou: votingPage.votingThankYou ?? "",
            votingPostVoteExplanation: votingPage.votingPostVoteExplanation,
            shareHeading: votingPage.shareHeading,
            shareSubHeading: votingPage.shareSubHeading,
            showIntroVideo: true,
            showSharePanel: true,
            questions: votingPage.questions,
            mainVideo: votingPage.mainVideo,
            videoThumbnail: votingPage.videoThumbnail,

        }
    /*
    heading={navItem.heading}
                                                introVideoId={extractYoutubeVideoId(navItem.introVideo?.url)}
                                                postVoteVideoId={extractYoutubeVideoId(
                                                    navItem.postVoteVideo
                                                )}
                                                showStatistics={navItem.showVoteStatistics ?? false}
                                                introText={navItem.introductionText ?? ""}
                                                votingThankYou={navItem.votingThankYou ?? ""}
                                                votingPostVoteExplanation={navItem.votingPostVoteExplanation}
                                                shareHeading={navItem.shareHeading}
                                                shareSubHeading={navItem.shareSubHeading}
                                                showIntroVideo={true}
                                                showSharePanel={true}
                                                questions={navItem.questions}
                                                mainVideo={navItem.mainVideo}
                                                videoThumbnail={navItem.videoThumbnail}
     */
    return data;
}