import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import {extractYoutubeVideoId, extractYoutubeVideoUrl} from "../utils/utilities";
import {Logger} from "aws-amplify";

function renderOptions(links) {

  const logger = new Logger('Rich text render log', 'INFO');
  // create an asset map
  const assetMap = new Map();
  // loop through the assets and add them to the map
  for (const asset of links.assets.block) {
    assetMap.set(asset.sys.id, asset);
  }

  // create an entry map
  const entryMap = new Map();
  // loop through the block linked entries and add them to the map
  for (const entry of links.entries.block) {
    entryMap.set(entry.sys.id, entry);
  }

  // loop through the inline linked entries and add them to the map
  for (const entry of links.entries.inline) {
    entryMap.set(entry.sys.id, entry);
  }
  const entryBlockMap = entryMap;

  return {
    // other options...

    renderNode: {
      // other options...
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        // find the entry in the entryMap by ID
        //currently not an option
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        // find the entry in the entryMap by ID
        const entry = entryBlockMap.get(node.data.target.sys.id);

        if (entry.__typename === "BlogPost" || entry.__typename === "VideoPage") {
          return (
              
                  <a href={entry.slug} className={"card"}>                    
                    <div className="card-content">                      
                      <h2>{entry.title}</h2>
                    </div></a>              
              
          );
        }
       
        if (entry.__typename === "YoutubeVideoEmbed") {
          // take the video url and extract the video id so we can clean it up
        
          let videoUrl =extractYoutubeVideoUrl(entry.ytembedUrl, entry.autoPlay)
          return (
              
            <div className={"videoIframe"}>
              <iframe
                className="video"
                src={videoUrl}
                title={entry.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          );
        }
        if (entry.__typename === "GenericImage") {
          return <img src={entry.image.url} alt={entry.title} />;
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
        // find the asset in the assetMap by ID
        const asset = assetMap.get(node.data.target.sys.id);
        logger.info("Asset found: " );
        logger.info(asset);
        if(asset.url.endsWith("pdf"))
        {
          return <a href={asset.url}>See PDF: {asset.title}</a>
        }
        else
        {
          return <img src={asset.url} title={asset.title}></img>
        }
        // render the asset accordingly
        
          
      },
    },
  };
}

export const richTextToReactNode = (json, links) =>
  documentToReactComponents(json, renderOptions(links));
