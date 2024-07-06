import { QueryResult } from "./types";
import { TPage} from "../../components/Page";
import React from 'react';
import {getLogger} from "../../utils/logger";
import { ReactNode } from "react";
import { renderMarkRule, renderNodeRule, StructuredText } from 'react-datocms';
import { isParagraph, isHeading } from 'datocms-structured-text-utils';
import type { StructuredText as TStructuredText } from 'datocms-structured-text-utils';
import {AssetTypes, ContentTypes, NavigationItem} from "../Navigation/types";
import {HubCollection} from "../../components/HubCollection";
import {VideoEmbed} from "../../components/VideoEmbed";
import {TArticlePage} from "../Common/types";



function datoRichTextToReactNode(content: TStructuredText): ReactNode {
 
  //see https://github.com/datocms/react-datocms/blob/master/docs/structured-text.md for documentation
  return (
      <StructuredText
          data={content}
          customNodeRules={[
            renderNodeRule(
                isParagraph,
                ({ adapter: { renderNode }, node, children, key }) => {
                  // If the paragraph contains an inline record, remove the surrounding p tags
                  if (node.children[0]?.type === 'inlineItem') {
                    return (
                        <React.Fragment key={key}>
                          {children}
                        </React.Fragment>
                    );
                  } else {
                    // Otherwise render the p tags
                    return renderNode(
                        'p',
                        {
                          key,
                        },
                        children,
                    );
                  }
                },
            ),
          ]}
          renderInlineRecord={({ record }) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const {__typename, id, ...props} = record;
                console.log(props);
              if (__typename === ContentTypes.NavigationGroup) {
                  const navItem = record as unknown as NavigationItem;
                  return (<HubCollection pageTitle={record.id} showVideoThumbNails={navItem?.showVideoThumbnailsInHub ?? false}
                                         items={navItem.navigationItem}></HubCollection>);
              }
              if (__typename === ContentTypes.BlogPost || record.__typename === ContentTypes.VideoPage) {
                  const page = record as unknown as TArticlePage;
                  return (
                      <a href={page.slug} className={"card"}>
                          <div className="card-content">
                              <h2>{page.title}</h2>
                          </div>
                      </a>
                  );
              }
              return <pre>props</pre>
          }}
            /* 

              if (__typename === AssetTypes.YoutubeVideoEmbed) {
                  // take the video url and extract the video id so we can clean it up       
                  return <VideoEmbed url={record.ytembedUrl} title={record.title} autoplay={record.autoPlay}
                                     showFrame={true}/>
              }
              if (__typename === AssetTypes.GenericImage) {
                  return <img src={props.image.url} alt={record.title}/>;
              }
              return (<>...</>)
          }}*/
            /*
            switch (__typename) {
              case 'WrapperVideoModelRecord': {
                const image = props.image as IImage;
                return (
                    <FullMedia
                        videoTitle={props.title as string}
                        videoId={props.youtubeId as string}
                        imageUrl={image.url as string}
                    />
                );
              }
              case 'WrapperImageModelRecord': {
                const image = props.image as IImage;
                let imageWidth = image.width;
                let imageHeight = image.height;

                if (imageWidth && imageHeight) {
                  const ratio = imageWidth / imageHeight;
                  if (!image) return <></>;
                  if (
                      type === ContentTypes.RichTextCaseStudyVariant
                  ) {
                    return (
                        <FullMedia imageUrl={image.url as string} />
                    );
                  } else if (imageWidth > 980) {
                    imageWidth = 980;
                    imageHeight = imageWidth / ratio;
                  }

                  return (
                      <NextImageWrapper
                          imageAlt={props.altText as string}
                          imageUrl={image.url as string}
                          width={imageWidth}
                          height={imageHeight}
                      />
                  );
                } else {
                  return <></>;
                }
              }
              case 'FeaturedLinkModelRecord':
                if (props.label) {
                  const imageUrl = props.imageThumbnail
                      ? (props.imageThumbnail as { url: string }).url
                      : '';
                  return (
                      <FeaturedDownload
                          className={
                            !props.imageThumbnail
                                ? articlestyles.withoutImage
                                : ''
                          }
                          image={imageUrl}
                          {...(props as TFeaturedDownload)}
                      />
                  );
                } else {
                  return <></>;
                }
              case 'ArticleLinkModelRecord':
                if (!props.label) {
                  return <></>;
                } else if (props.primary) {
                  return (
                      <LinkButton
                          href={props.url as string}
                          buttonIcon={ButtonIcon.External}
                      >
                        {props.label as string}
                      </LinkButton>
                  );
                } else if (!props.primary) {
                  return (
                      <LinkButton
                          href={props.url as string}
                          variant={ButtonVariant.Link}
                          buttonIcon={ButtonIcon.External}
                          className={articlestyles.secondaryLink}
                      >
                        {props.label as string}
                      </LinkButton>
                  );
                } else {
                  return <></>;
                }
              default:
                return null;
            }*/
         // }}
          
          renderBlock={({ record }) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { __typename, id, ...props } = record;

            switch (__typename) {
              case 'ContentTableRecord': {
                const table = (props.htmlTable as string).replace(
                    /height="[^"]+"/,
                    '',
                );
                return (
                    <div
                        dangerouslySetInnerHTML={{
                          __html: table,
                        }}
                    ></div>
                );
              }
              default:
                return null;
            }
          }}
      ></StructuredText>
  );
}



export async function mapBlogData(result: QueryResult): Promise<TPage> {
  
  const actualPost = result.data.allBlogPostModels.shift();
  
  if(!actualPost)
  {
    throw new Error("no blog post")
  }
  let react = null;
  try {
    react = datoRichTextToReactNode(actualPost.body);
  } catch (e) {
    const logger = getLogger('Exception');
    logger.error(e);
  }

  const model: TPage = {
    header: actualPost.title,
    heroImageUrl: actualPost.image?.url,
    heroImageAltText: actualPost.image?.description,
    richText: react,
  };
  return model;
}


