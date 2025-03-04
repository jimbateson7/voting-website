import {Item, QueryResult} from "./types";

import React, {ReactNode} from 'react';
import {getLogger} from "../../utils/logger";
import {renderNodeRule, StructuredText} from 'react-datocms';
import type {StructuredText as TStructuredText} from 'datocms-structured-text-utils';
import {isParagraph} from 'datocms-structured-text-utils';
import {ContentTypes, NavigationItem} from "../Navigation/types";
import {HubCollection} from "../../components/HubCollection";
import {TArticlePage} from "../Common/types";
import {TPage} from "../../components/PageData";


function datoRichTextToReactNode(content: TStructuredText): ReactNode {

    console.log("hello world i am the render")
    console.log(content.links);
    //see https://github.com/datocms/react-datocms/blob/master/docs/structured-text.md for documentation
    return (
        <StructuredText
            data={content}
            
            customNodeRules={[
                renderNodeRule(
                    isParagraph,
                    ({adapter: {renderNode}, node, children, key}) => {
                        // If the paragraph contains an inline record, remove the surrounding p tags
                        if (node.children[0]?.type === 'inlineItem') {
                            console.log("is inline item")
                            return (
                                <React.Fragment key={key}>
                                    {children}
                                </React.Fragment>
                            );
                        } else {
                            // Otherwise render the p tags
                            console.log("is item")
                            console.log(node.children[0]?.type)
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
            renderInlineRecord={({record}) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {__typename, id, ...props} = record;
                console.log("is record " + id)
                if (__typename === ContentTypes.NavigationGroup) {
                    const navItem = record as unknown as NavigationItem;
                    return (<HubCollection pageTitle={record.id}
                                           showVideoThumbNails={navItem?.showVideoThumbnailsInHub ?? false}
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
          
            renderBlock={({record}) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {__typename, id, ...props} = record;
                console.log("is block " + id)
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


export function mapBlogPost(actualPost: Item | undefined) {
    if (!actualPost) {
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

export async function mapBlogData(result: QueryResult): Promise<TPage | null> {

    const actualPost = result.data.allBlogPostModels.shift();
    if(!actualPost)
        return null;

    return mapBlogPost(actualPost);
}


