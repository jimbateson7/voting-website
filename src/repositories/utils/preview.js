﻿let preview = false;
export function getPreview()
{
    return preview
}
export function setPreview(value)
{
    preview = value;
}
export function refreshPreview()
{
    const urlParams = new URLSearchParams(window.location.search);
    const isPreview = urlParams.get('preview');
    setPreview(!!isPreview);
    if(isPreview)
        console.log(`Preview is ${preview}`);
}
export const DEBUG_QUERY = process.env.REACT_APP_DEBUG_QUERIES ?? false; //todo do off env variable