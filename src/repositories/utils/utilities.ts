export const extractYoutubeVideoId = (fullUrl?: string): string => {
    if (!fullUrl) return "Invalid Video";

    //this way someone can add a "watch/embed/share" yt link and it will still work
    const youtubeId = fullUrl.slice(-11);

    return youtubeId;
};