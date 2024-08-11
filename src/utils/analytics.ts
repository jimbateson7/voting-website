import {AnalyticsEvent} from "@aws-amplify/analytics/lib-esm/types";
import {Analytics} from "aws-amplify";
import {EventAttributes} from "@aws-amplify/analytics/src/types/Analytics";
import gtag from "./gtag";
import {DataStore} from '@aws-amplify/datastore';
import {Event} from '../models';

type TTrackingItem = {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eventAttributes?: EventAttributes;// Record<string, any>;
    //  userID: string;
    eventName: string;
    event: string;
    //  eventLabel?: string;
    //  choice?:string;

};

declare global {
    interface Window {
        dataLayer: Array<TTrackingItem>;
        gtag: (...args: any[]) => void;
        gaEnabled: boolean
    }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pushToGaDatalayer = (name: string, userId: string, eventData?: EventAttributes): void => {

    if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "analytics_event",
            eventName: name,
            eventAttributes: eventData
        });
    }
};


export function EnableAnalytics() {
    window.gaEnabled = true;

    if (typeof window !== 'undefined') {
        gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'granted'
        });
    }

    Analytics.enable();
}

export function InitAnalytics() {
    if (typeof window !== 'undefined') {
        /* Set default consent permission - All denied in our case */
        gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            wait_for_update: 500
        });
    }
}

export function DisableAnalytics() {
    if (typeof window !== 'undefined') {
        gtag('consent', 'update', {
            analytics_storage: 'denied',
            ad_storage: 'denied'
        });
    }

    window.gaEnabled = false;
    Analytics.disable();
}

export function recordUse(e: AnalyticsEvent, userId?: string | null) {

    pushToGaDatalayer(e.name, userId ?? "unknown_user", e.attributes)
    Analytics.record(e)

    if (window.gaEnabled) {
        DataStore.save(
            new Event({
                "userId": userId,
                "eventName": e.name,
                "attributes": JSON.stringify(e.attributes)
            })
        );
    }
}
