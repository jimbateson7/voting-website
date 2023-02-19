import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import {extractYoutubeVideoId, extractYoutubeVideoUrl} from "../utils/utilities";

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
  function createAnchorLink(link)
  {
    let text = `${link}`;
    text = text.trim().toLowerCase();
    text = text.replace(" ", "-");
    return text;
  }

  function videoEmbed(title, url, autoplay) {
    let videoUrl = extractYoutubeVideoUrl(url, autoplay)
    return (

        <div className={"videoIframe"}>
          <iframe
              className="video"
              src={videoUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
          ></iframe>
        </div>
    );
  }

  return {
    // other options...
    
    renderNode: {
      // other options...
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        // find the entry in the entryMap by ID
        //currently not an option
      },
      [BLOCKS.HEADING_2]:(node, children) =>
      {
          return <h2 id={`${children}`}>{children}</h2>
        },
      [BLOCKS.HEADING_3]:(node, children) =>
      {
         let text = createAnchorLink(children);
         return <h3 id={text}>{children}</h3>
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        // find the entry in the entryMap by ID
        const entry = entryBlockMap.get(node.data.target.sys.id);

        function handleNavItems(items) {
          if(!items)
            return [];
          
          let nodesUnderneath = [];          
          let nodes = [];
          
          items.forEach((x,i) => {
            let link = x.slug ?? `#${createAnchorLink(x.title)}`;

            
            if (x.__typename === "NavigationGroup") {             
              nodesUnderneath.push(<h3 id={createAnchorLink(x.title)}>{x.title}</h3>)
              nodesUnderneath.push(handleNavItems(x.navigationItemCollection?.items))         
            }

            if (x.__typename === "VideoPage") {
              nodes.push(<div className={"card"} key={i}>
                <div className="card-content">
                  <a href={link}>{x.title}</a>
                  {videoEmbed(x.video.title,x.video.ytembedUrl,false)}
                </div>
              </div>)
            }
            else {
              nodes.push(<a href={link} className={"card"} key={i}>
                <div className="card-content">
                  <h2>{x.title}</h2>
                </div>
              </a>)
            }
          })
          nodes =   nodes.concat(nodesUnderneath);
          return nodes;
        }

        if(entry.__typename === "NavigationGroup")
        {
          return handleNavItems(entry.navigationItemCollection.items);

        }
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
          return videoEmbed(entry.title, entry.ytembedUrl, entry.autoPlay);
        }
        if (entry.__typename === "GenericImage") {
          return <img src={entry.image.url} alt={entry.title} />;
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
        // find the asset in the assetMap by ID
        const asset = assetMap.get(node.data.target.sys.id);
        console.log("Asset found: " );
        console.log(asset);
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
