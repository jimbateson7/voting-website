import React, {useEffect, useState} from "react";
import { ListGroup } from "react-bootstrap";
import "./VideoControl.scss"

export type TReferenceProps = {currentTimeStamp: number}

interface Reference {
    time: number;
    title: string;
    pdfLink: string;
}

const references: Reference[] = [
    { time: 10, title: "Research Paper A", pdfLink: "papers/paperA.pdf" },
    { time: 25, title: "Study on X", pdfLink: "papers/studyX.pdf" },
    { time: 40, title: "Article Y", pdfLink: "papers/articleY.pdf" },
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
        <ListGroup> {/* Use ListGroup for better styling */}
            {activeIndex !=null  ? <ListGroup.Item
                key={activeIndex}
                style={{ textAlign: "left" }}
                action // Makes the items clickable
                active={true} // Sets active state
                className="text-left"
                
                onClick={() => {
                    window.open(references[activeIndex].pdfLink, "_blank");
                }}
               
            >
                {references[activeIndex].title}
            </ListGroup.Item> : null}
            
            {references.map((ref, indexA) => (
                indexA !== activeIndex ? <ListGroup.Item
                    key={indexA}
                    style={{ textAlign: "left" }}
                    className="text-left"
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