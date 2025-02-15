import React, {useEffect, useState} from "react";
import { ListGroup } from "react-bootstrap";
import "./VideoControl.scss"
import "./VideoReferenceControl.scss"
export type TReferenceProps = {currentTimeStamp: number}

interface Reference {
    time: number;
    title: string;
    pdfLink: string;
}


const references: Reference[] = [
    { time: 14, title: "Should we know?", pdfLink: "https://www.datocms-assets.com/136385/1739562417-1-should-we-know.pdf" },
    { time: 26, title: "What is Hothouse Earth", pdfLink: "https://www.datocms-assets.com/136385/1739562418-2-what-is-hothouse-earth.pdf" },
    { time: 79, title: "The EEI", pdfLink: "https://www.datocms-assets.com/136385/1739562417-3-the-earth-energy-imbalance.pdf" }, //Getting Hotter More Quickly
    { time: 88, title: "Getting Hotter More Quickly", pdfLink: "https://www.datocms-assets.com/136385/1739562417-4-we-are-getting-hotter-more-quickly.pdf" },
    { time: 116, title: "Methane", pdfLink: "https://www.datocms-assets.com/136385/1739562417-5-methane.pdf" },
    { time: 176, title: "Human Emissions", pdfLink: "https://www.datocms-assets.com/136385/1739562417-6-the-investigation.pdf" },
    { time: 182, title: "The Investigation", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, //176
];

function findClosestReferenceIndex(currentTimeStamp: number, limit:number = 10): number | undefined {
    let low = 0;
    let high = references.length - 1;
    let closestIndex: number | undefined = undefined;
    let minDifference = Infinity;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const reference = references[mid];

        if (reference.time > currentTimeStamp) {
            high = mid - 1; // Skip references that are too late
        } else if (currentTimeStamp - reference.time > 0 && currentTimeStamp - reference.time <= limit) {
            const difference = currentTimeStamp - reference.time;
            if (difference < minDifference) {
                minDifference = difference;
                closestIndex = mid;
            }
            low = mid + 1; // Check for even closer values on the right
        } else {
            low = mid + 1; // Too far behind or within the limit seconds but not the closest, search right
        }
    }

    return closestIndex;
}

export const VideoReferenceControl = ({currentTimeStamp}: TReferenceProps) => {
    const activeIndex =findClosestReferenceIndex(currentTimeStamp) ?? null;

    return (
        <ListGroup style={{height:"20%", overflowY: "auto", overflowX:"hidden"}}> {/* Use ListGroup for better styling */}
            {activeIndex !=null  ? <ListGroup.Item 
                key={activeIndex}           
               
                action // Makes the items clickable
                active={true} // Sets active state
                className="text-left  list-group-item-text"
                
                onClick={() => {
                    window.open(references[activeIndex].pdfLink, "_blank");
                }}
               
            >
                {references[activeIndex].title}
            </ListGroup.Item> : null}
            
            {references.map((ref, indexA) => (
                indexA !== activeIndex ? <ListGroup.Item
                    key={indexA}

                    className="text-left list-group-item-text"
                    action // Makes the items clickable
                    active={indexA === activeIndex} // Sets active state
                    onClick={() => {                      
                        window.open(ref.pdfLink, "_blank");
                    }}
                 
                >
                    {ref?.title}
                </ListGroup.Item> : null)
            )}
        </ListGroup>
    );

}