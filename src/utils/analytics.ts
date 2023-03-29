import {AnalyticsEvent} from "@aws-amplify/analytics/lib-esm/types";
import {Analytics} from "aws-amplify";
import {EventAttributes} from "@aws-amplify/analytics/src/types/Analytics";


// enum to keep actions consistent
export enum GaAction {
    Click = 'click',
    FormSubmit = 'submit',
}

type TTrackingItem = {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attributes?: EventAttributes;// Record<string, any>;
    userID: string;

    event: string;
    eventLabel?: string;

  
};

declare global {
    interface Window {
        dataLayer: Array<TTrackingItem>;
        gaEnabled:boolean
    }
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pushToGaDatalayer = (name:string, userId:string, eventData?: EventAttributes): void => {
    
    if (typeof window !== 'undefined' && window.dataLayer) {
       
        window.dataLayer.push({
            name: name,
            attributes: eventData,
            userID: userId    ,
            event:name,
            eventLabel: userId,
        });
    }
};
export function EnableAnalytics()
{
    window.gaEnabled = true;
    Analytics.enable();
}
export function DisableAnalytics()
{
    window.gaEnabled = false;
    Analytics.disable();
}

export function recordUse(e: AnalyticsEvent, userId?:string | null) {
    
    if(window.gaEnabled) {
        pushToGaDatalayer(e.name, userId ?? "unknown_user", e.attributes)
    }
    
    Analytics.record(e)
}
