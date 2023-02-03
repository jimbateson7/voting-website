import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import {extractYoutubeVideoId} from "../utils/utilities";

function renderOptions(links) {
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

        if (entry.__typename === "VideoEmbed") {
          return (
            <iframe
              src={entry.embedUrl}
              height="100%"
              width="100%"
              frameBorder="0"
              scrolling="no"
              title={entry.title}
              allowFullScreen={true}
            />
          );
        }
        if (entry.__typename === "YoutubeVideoEmbed") {
          //const videoId = extrac
          let video = entry.ytembedUrl;
          let videoId = extractYoutubeVideoId(video);
          let videoUrl = `https://www.youtube.com/embed/${videoId}`;
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

        // render the asset accordingly
        return <img src={asset.url} alt={asset.title} />;
      },
    },
  };
}

export const richTextToReactNode = (json, links) =>
  documentToReactComponents(json, renderOptions(links));
