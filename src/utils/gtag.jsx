window.dataLayer = window.dataLayer || [];

export default function gtag() {
    // The gtag dataLayer requires an actual Arguments object to be pushed.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
}