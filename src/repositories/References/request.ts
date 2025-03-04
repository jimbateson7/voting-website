import {TReference} from "../../components/VideoReferenceControl";

const updatedVideoReferences = [
    { time: 19, title: "Should we know?", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-1-should-we-know.pdf" },
    { time: 19, title: "Reasonable", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-2-reasonable.pdf" }, // No link provided, setting to null
    { time: 26, title: "Hothouse Earth?", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-3-hothouse-earth.pdf" },
    { time: 64, title: "The Energy Imbalance", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-4-the-eei.pdf" },
    { time: 85, title: "Getting Hotter More Quickly", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-5-getting-hotter-more-quickly.pdf" },
    { time: 95, title: "Methane", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-6-methane.pdf" },
    { time: 130, title: "The numbers Used", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, // No link provided, setting to null
    { time: 153, title: "Aerosols", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, // No link provided, setting to null
    { time: 182, title: "The Investigation", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 130, title: "Human Emissions", pdfLink: "https://www.datocms-assets.com/136385/1739562417-6-the-investigation.pdf" },
    { time: 256, title: "Global Net Zero", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, // No link provided, setting to null
    { time: 287, title: "Absorption of Carbon", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, // No link provided, setting to null
    { time: 309, title: "Melting of Snow and Ice", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, // No link provided, setting to null
    { time: 395, title: "Other Factors", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, // No link provided, setting to null
    { time: 434, title: "Right Ballpark", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, // No link provided, setting to null
    { time: 468, title: "Subsea permafrost", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, // No link provided, setting to null
    { time: 488, title: "Clouds", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, // No link provided, setting to null
    { time: 549, title: "interactions", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, // No link provided, setting to null
    { time: 583, title: "The Shaded area", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, // No link provided, setting to null
    { time: 723, title: "10X faster", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, // No link provided, setting to null
    { time: 745, title: "Our Planet’s protector", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, // No link provided, setting to null
    { time: 767, title: "As soon as possible", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, // No link provided, setting to null
];

export function getReferences(videoId?: string): TReference[]
{
    return updatedVideoReferences;
}