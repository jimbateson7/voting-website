export const extractYoutubeVideoId = (fullUrl?: string): string => {
    if (!fullUrl) return "Invalid Video";

    //this way someone can add a "watch/embed/share/the id" yt link and it will still work
    const youtubeId = fullUrl.slice(-11);

    return youtubeId;
};

export const extractYoutubeVideoUrl = (video?: string, autoPlay: boolean = false): string => {
    let videoId = extractYoutubeVideoId(video);
    let autoPlayUrl = autoPlay ? 1 : 0;
    let videoUrl = `https://www.youtube.com/embed/${videoId}?&autoplay=${autoPlayUrl}`;
    return videoUrl;
};