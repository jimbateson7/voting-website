import React, {useEffect, useState} from "react";
import { ListGroup } from "react-bootstrap";
import "./VideoControl.scss"
import "./VideoReferenceControl.scss"
export type TReferenceProps = {
    currentTimeStamp: number
    videoColReference: React.RefObject<HTMLElement | null>
    sideBarColReference: React.RefObject<HTMLElement | null>
    rowReference: React.RefObject<HTMLElement | null>
}

interface Reference {
    time: number;
    title: string;
    pdfLink: string;
}

/*
const _references: Reference[] = [
    { time: 14, title: "Should we know?", pdfLink: "https://www.datocms-assets.com/136385/1739562417-1-should-we-know.pdf" },
    { time: 26, title: "What is Hothouse Earth", pdfLink: "https://www.datocms-assets.com/136385/1739562418-2-what-is-hothouse-earth.pdf" },
    { time: 79, title: "The EEI", pdfLink: "https://www.datocms-assets.com/136385/1739562417-3-the-earth-energy-imbalance.pdf" }, //Getting Hotter More Quickly
    { time: 88, title: "Getting Hotter More Quickly", pdfLink: "https://www.datocms-assets.com/136385/1739562417-4-we-are-getting-hotter-more-quickly.pdf" },
    { time: 116, title: "Methane", pdfLink: "https://www.datocms-assets.com/136385/1739562417-5-methane.pdf" },
    { time: 176, title: "Human Emissions", pdfLink: "https://www.datocms-assets.com/136385/1739562417-6-the-investigation.pdf" },
    { time: 182, title: "The Investigation", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, //176
];
*/
const _references: Reference[] = [
    { time: 4, title: "Should we know?", pdfLink: "https://www.datocms-assets.com/136385/1739562417-1-should-we-know.pdf" },
    { time: 6, title: "What is Hothouse Earth", pdfLink: "https://www.datocms-assets.com/136385/1739562418-2-what-is-hothouse-earth.pdf" },
    { time: 9, title: "The EEI", pdfLink: "https://www.datocms-assets.com/136385/1739562417-3-the-earth-energy-imbalance.pdf" }, //Getting Hotter More Quickly
    { time: 18, title: "Getting Hotter More Quickly", pdfLink: "https://www.datocms-assets.com/136385/1739562417-4-we-are-getting-hotter-more-quickly.pdf" },
    { time: 26, title: "Methane", pdfLink: "https://www.datocms-assets.com/136385/1739562417-5-methane.pdf" },
    { time: 29, title: "Human Emissions", pdfLink: "https://www.datocms-assets.com/136385/1739562417-6-the-investigation.pdf" },
    { time: 32, title: "The Investigation", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, //176
];

function getValidReferences(currentTimeStamp:number, references:Reference[]):Reference[]
{
    return references.filter( ref => ref.time < currentTimeStamp);
}
function findClosestReferenceIndex(currentTimeStamp: number, references:Reference[], limit:number = 10): number | undefined {
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

export const VideoReferenceControl = ({currentTimeStamp, videoColReference,rowReference,sideBarColReference}: TReferenceProps) => {
    //const allReferences =_references.sort((a, b) => b.time - a.time);
    const allReferences = _references
    const activeIndex =findClosestReferenceIndex(currentTimeStamp,allReferences,10) ?? null;
    const activeReference: Reference | null = activeIndex ? _references[activeIndex] : null;
    var referenceTime = activeReference?.time;
    const validReferences = getValidReferences(currentTimeStamp, allReferences);//.sort((a, b) => b.time - a.time);
    
    var hiddenReferences = allReferences.length - validReferences.length;
    const [fullWidthStyle, setFullWidthStyle] = useState({});
    const [colWidthStyle, seColWidthStyle] = useState({});
    const [originY, setOriginY] = useState(0);
    const [rowHeight, setRowHeight] = useState(0);
    const [itemHeight, setItemHeight] = useState(52);
    useEffect(() => {
        const handleResize = () => {

            handleReferenceControlChange()

        };

        // Add the event listener
        window.addEventListener('resize', handleResize);

        // Cleanup function: remove the event listener when the component unmounts or the effect re-runs
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array means this effect runs only on mount and unmount

    function handleReferenceControlChange()
    {
        if (rowReference.current && sideBarColReference.current && videoColReference.current) {
            const rowRect = rowReference.current.getBoundingClientRect();
            const colRect = sideBarColReference.current.getBoundingClientRect();
            const vidRect = videoColReference.current.getBoundingClientRect();
            //const reversePadding = 0.068;
            //const width = rect.width * (1-reversePadding);
            //const left = rect.left + (rect.width *(reversePadding/2)); 
            setFullWidthStyle({
               width: rowRect.width,
                left: rowRect.left,
               // top: 0,
            });

            seColWidthStyle({
                width: colRect.width,
                left: colRect.left,
                //top: 0,
            });

            setRowHeight(rowRect.height)
            setOriginY(50);
        } else {
            setFullWidthStyle({}); // Clear styles when no active reference
        }
    }
    useEffect(() => {
        handleReferenceControlChange();
    }, [rowReference, sideBarColReference,videoColReference]);
    
    return (
        <ListGroup style={{ overflowY: "auto", overflowX:"hidden"}}> {/* Use ListGroup for better styling */}
        
            {allReferences.map((ref, indexA) =>
            {
                var allReferencesCount = _references.length;
                var isActive = activeIndex === indexA;
                var isHidden = ref.time > currentTimeStamp;
                var style = isActive ? fullWidthStyle : colWidthStyle;
                var normalTop = originY + ((allReferencesCount-(indexA+hiddenReferences)) * itemHeight);//rowHeight - (originY +(40 * (indexA + hiddenReferences)));
                var activeTop = originY;
                
                var newStyle ={
                    ...style,
                    //bottom: isActive ? undefined : originY +(40 * (indexA)),
                    
                    top: isActive ? activeTop: normalTop,
                    display: isHidden && !isActive ? "none" : "inline-block",
                }
                return (
               <ListGroup.Item
                    key={ref.time}

                    className={`text-left list-group-item-text ${isActive ? "current-reference" : "other-reference"}`}
                    action // Makes the items clickable
                    style={newStyle}
                    active={isActive} // Sets active state
                    onClick={() => {                        
                        window.open(ref.pdfLink, "_blank");
                    }}
                 
                >
                    🔗{ref?.title}
                </ListGroup.Item> 
            )})}
        </ListGroup>
    );

}