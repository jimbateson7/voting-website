import {buildClient, Client} from '@datocms/cma-client-node';


interface UploadSrtOptions {
    
    videoId: string;
    srtFiles:  File[];
}

export async function uploadSrtFiles(options: UploadSrtOptions) {
    const api_token = "7f56cff33e1b9aff0e239ebbd22b4c";
    const datoClient = buildClient({ apiToken: api_token });
    const { videoId, srtFiles } = options;
    
    // Create a Dato video item if it doesn't exist
    const videoItem = await datoClient.uploads.find(videoId);
    console.log("video is")
    console.log(videoItem)
    //datoClient.uploads.update(videoItem.id, {})
    
    srtFiles.forEach( file =>
    {
        const filenName = file.name;
        const langCode = filenName.substring(0, filenName.lastIndexOf('.'));
        
        console.log(`FileName is ${filenName} and langCode is ${langCode} and type is ${file.type}`);
        
    })
    
    // Upload SRT files and associate them with the video
    /*for (const [languageCode, srtFile] of Object.entries(srtFiles)) {
        const uploadResult = await datoClient.uploads.create(srtFile);
        const srtItem = await datoClient.item.create({
            itemType: 'srt',
            attributes: {
                file: uploadResult.id,
                language: languageCode,
            },
        });

        // Associate the SRT item with the video
        await datoClient.item.update(videoItem.id, {
            attributes: {
                subtitles: [...(videoItem.attributes.subtitles || []), srtItem.id],
            },
        });
    }*/
}