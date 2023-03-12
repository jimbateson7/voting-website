import { createAnchorLinkFromTitle } from "../repositories/utils/utilities";
import "./HubCollection.scss";
import { VideoEmbed } from "./VideoEmbed";
import { ContentTypes } from "../repositories/Navigation/types";

export type THubCollection = {
  items: []
  title?: string;
  showVideoThumbNails: boolean
  parentTitle?: string;
  ukey?: number;
};

export type THubCard =
  {
    title: string;
    link: string;
    ukey: number;
  }
export type TVidoHubCard = THubCard &
{
  videoTitle: string;
  videoUrl: string;
}
export const HubCard = (props: THubCard) => {
  const title = props.title;
  const breakPoint = 40;
  const scaleFactor = 70;
  const overrideFontSize = (title.length > breakPoint);
  let overrideFontSizeTo = "";
  if (overrideFontSize) {
    let dynamicSize = (scaleFactor / title.length);
    overrideFontSizeTo = `${dynamicSize}rem`;
  }
  return (
    <a href={props.link} className={"card"} key={props.ukey}>
      <div className="card-content">
        {overrideFontSize
          ? <h2 font-overridded={overrideFontSize} style={{ fontSize: overrideFontSizeTo }}>{title}</h2>
          : <h2>{title}</h2>}
      </div>
    </a>)
}
export const VideoHubCard = (props: TVidoHubCard) => {
  return (
    <div className="card video-card">
      <div className="card-content" key={props.ukey}>
        <a href={props.link}><h2>{props.title}</h2></a>
        <VideoEmbed title={props.videoTitle} url={props.videoUrl} autoplay={false} showFrame={false} />
      </div>
    </div>)
}
export const HubCollection = (props: THubCollection) => {
  let subHubCollections: any[] = [];
  let mainHubCards: any[] = [];
  createHubCards(props.items);

  function createHubCards(items: []) {
    if (!items)
      return [];

    items.forEach((x: any, i) => {
      let link = x.slug ?? `#${createAnchorLinkFromTitle(x.title)}`;

      switch (x.__typename) {
        case ContentTypes.NavigationGroup:
          //add card that will link to new hub
          mainHubCards.push(
            <HubCard title={x.title} link={link} ukey={i} />
          )
          //create a new hub at the bottom

          subHubCollections.push(<HubCollection showVideoThumbNails={x.showVideoThumbnailsInHub ?? false} parentTitle={props.title} title={x.title} items={x.navigationItemCollection?.items} ukey={i} />)
          break;
        case ContentTypes.VideoPage:

          if (props.showVideoThumbNails) {
            mainHubCards.push(
              <VideoHubCard title={x.title} link={link} videoTitle={x.video.title}
                videoUrl={x.video.ytembedUrl} ukey={i} />
            )
          }
          else {
            mainHubCards.push(
              <HubCard title={x.title} link={link} ukey={i} />
            )
          }
          break;
        default:
          mainHubCards.push(
            <HubCard title={x.title} link={link} ukey={i} />
          )
          break;
      }
    })

  }
  //  const title = props.parentTitle ? props.title + ": " + x.title : x.title;

  return (
    <div className="hub" key={props.ukey ? props.ukey : 0} >
      {props.parentTitle ? <h2>{props.parentTitle}:</h2> : null}
      {props.title ? <h2 id={createAnchorLinkFromTitle(props.title)}>{props.title}</h2> : null}
      {mainHubCards}
      {subHubCollections}
    </div>);
}