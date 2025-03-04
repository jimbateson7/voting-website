import {TReference} from "../../components/VideoReferenceControl";

const hindiVideoReferences = [
    { time: 19, title: "क्या हमें यह जानना चाहिए?", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-1-should-we-know.pdf" },
    { time: 19, title: "उचित", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-2-reasonable.pdf" },
    { time: 26, title: "हॉटहाउस अर्थ?", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-3-hothouse-earth.pdf" },
    { time: 64, title: "ऊर्जा असंतुलन", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-4-the-eei.pdf" },
    { time: 85, title: "तेज़ी से गर्म होना", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-5-getting-hotter-more-quickly.pdf" },
    { time: 95, title: "मीथेन", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-6-methane.pdf" },
    { time: 130, title: "उपयोग किए गए आंकड़े", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 153, title: "एरोसोल", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 182, title: "जांच", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 130, title: "मानव उत्सर्जन", pdfLink: "https://www.datocms-assets.com/136385/1739562417-6-the-investigation.pdf" },
    { time: 256, title: "वैश्विक नेट जीरो", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 287, title: "कार्बन का अवशोषण", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 309, title: "हिम और बर्फ का पिघलना", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 395, title: "अन्य कारक", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 434, title: "सही अनुमान", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 468, title: "सी-समुद्री पर्माफ्रॉस्ट", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 488, title: "बादल", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 549, title: "परस्पर क्रियाएँ", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 583, title: "छायांकित क्षेत्र", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 723, title: "10X तेजी से", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 745, title: "हमारे ग्रह का रक्षक", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 750, title: "जल्द से जल्द", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 752, title: "दान करें", pdfLink: "https://ourplanetourpeople.com/en/donate" }
];


const frenchVideoReferences = [
    { time: 19, title: "Devons-nous savoir ?", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-1-should-we-know.pdf" },
    { time: 19, title: "Raisonnable", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-2-reasonable.pdf" },
    { time: 26, title: "Terre de serre ?", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-3-hothouse-earth.pdf" },
    { time: 64, title: "Le déséquilibre énergétique", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-4-the-eei.pdf" },
    { time: 85, title: "Devenir plus chaud plus rapidement", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-5-getting-hotter-more-quickly.pdf" },
    { time: 95, title: "Méthane", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-6-methane.pdf" },
    { time: 130, title: "Les chiffres utilisés", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 153, title: "Aérosols", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 182, title: "L'enquête", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 130, title: "Émissions humaines", pdfLink: "https://www.datocms-assets.com/136385/1739562417-6-the-investigation.pdf" },
    { time: 256, title: "Objectif zéro émission nette", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 287, title: "Absorption du carbone", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 309, title: "Fonte de la neige et de la glace", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 395, title: "Autres facteurs", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 434, title: "Juste ordre de grandeur", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 468, title: "Pergélisol sous-marin", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 488, title: "Nuages", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 549, title: "Interactions", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 583, title: "La zone ombragée", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 723, title: "10 fois plus rapide", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 745, title: "Le protecteur de notre planète", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 750, title: "Dès que possible", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 752, title: "Faire un don", pdfLink: "https://ourplanetourpeople.com/en/donate" }
];

const dutchVideoReferences = [
    { time: 19, title: "Moeten we het weten?", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-1-should-we-know.pdf" },
    { time: 19, title: "Redelijk", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-2-reasonable.pdf" },
    { time: 26, title: "Broeikas Aarde?", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-3-hothouse-earth.pdf" },
    { time: 64, title: "De energie-onbalans", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-4-the-eei.pdf" },
    { time: 85, title: "Sneller heter worden", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-5-getting-hotter-more-quickly.pdf" },
    { time: 95, title: "Methaan", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-6-methane.pdf" },
    { time: 130, title: "De gebruikte cijfers", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 153, title: "Aerosolen", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 182, title: "Het onderzoek", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 130, title: "Menselijke uitstoot", pdfLink: "https://www.datocms-assets.com/136385/1739562417-6-the-investigation.pdf" },
    { time: 256, title: "Mondiale netto-nul", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 287, title: "Opname van koolstof", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 309, title: "Smelten van sneeuw en ijs", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 395, title: "Andere factoren", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 434, title: "Juiste orde van grootte", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 468, title: "Onderzees permafrost", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 488, title: "Wolken", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 549, title: "Interactie", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 583, title: "Het schaduwgebied", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 723, title: "10X sneller", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 745, title: "De beschermer van onze planeet", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 750, title: "Zo snel mogelijk", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 752, title: "Doneren", pdfLink: "https://ourplanetourpeople.com/en/donate" }
];

const serbianVideoReferences = [
    { time: 19, title: "Da li treba da znamo?", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-1-should-we-know.pdf" },
    { time: 19, title: "Razumno", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-2-reasonable.pdf" },
    { time: 26, title: "Staklena bašta Zemlje?", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-3-hothouse-earth.pdf" },
    { time: 64, title: "Energetska neravnoteža", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-4-the-eei.pdf" },
    { time: 85, title: "Zagrevanje sve brže", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-5-getting-hotter-more-quickly.pdf" },
    { time: 95, title: "Metan", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-6-methane.pdf" },
    { time: 130, title: "Korišćeni brojevi", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 153, title: "Aerozoli", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 182, title: "Istraga", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 130, title: "Ljudske emisije", pdfLink: "https://www.datocms-assets.com/136385/1739562417-6-the-investigation.pdf" },
    { time: 256, title: "Globalna neto nula", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 287, title: "Apsorpcija ugljenika", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 309, title: "Topljenje snega i leda", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 395, title: "Ostali faktori", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 434, title: "Prava mera", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 468, title: "Podmorski permafrost", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 488, title: "Oblaci", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 549, title: "Interakcije", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 583, title: "Zasjenčena oblast", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 723, title: "10X brže", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 745, title: "Zaštitnik naše planete", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 750, title: "Što je pre moguće", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" },
    { time: 752, title: "Donirajte", pdfLink: "https://ourplanetourpeople.com/en/donate" }
];


const translatedVideoReferences: { [key: string]: { time: number; title: string; pdfLink: string }[] } = {
    en: [
        {
            time: 19,
            title: "Should we know?",
            pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-1-should-we-know.pdf"
        },
        {
            time: 19,
            title: "Reasonable",
            pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-2-reasonable.pdf"
        },
        {
            time: 26,
            title: "Hothouse Earth?",
            pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-3-hothouse-earth.pdf"
        },
        {
            time: 64,
            title: "The Energy Imbalance",
            pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-4-the-eei.pdf"
        },
        {
            time: 85,
            title: "Getting Hotter More Quickly",
            pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-5-getting-hotter-more-quickly.pdf"
        },
        {time: 95, title: "Methane", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4500-6-methane.pdf"},
        {
            time: 130,
            title: "The numbers Used",
            pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf"
        },
        {time: 153, title: "Aerosols", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf"},
        {
            time: 182,
            title: "The Investigation",
            pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf"
        },
        {
            time: 130,
            title: "Human Emissions",
            pdfLink: "https://www.datocms-assets.com/136385/1739562417-6-the-investigation.pdf"
        },
        {
            time: 256,
            title: "Global Net Zero",
            pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf"
        },
        {
            time: 287,
            title: "Absorption of Carbon",
            pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf"
        },
        {
            time: 309,
            title: "Melting of Snow and Ice",
            pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf"
        },
        {
            time: 395,
            title: "Other Factors",
            pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf"
        },
        {
            time: 434,
            title: "Right Ballpark",
            pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf"
        },
        {
            time: 468,
            title: "Sub-sea permafrost",
            pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf"
        },
        {time: 488, title: "Clouds", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf"},
        {
            time: 549,
            title: "interactions",
            pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf"
        },
        {
            time: 583,
            title: "The Shaded area",
            pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf"
        },
        {
            time: 723,
            title: "10X faster",
            pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf"
        },
        {
            time: 745,
            title: "Our Planet’s protector",
            pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf"
        },
        {
            time: 750,
            title: "As soon as possible",
            pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf"
        },
        {time: 752, title: "Donate", pdfLink: "https://ourplanetourpeople.com/en/donate"}
    ],
    fr:frenchVideoReferences,
    nl:dutchVideoReferences,
    sr: serbianVideoReferences, 
    hi: hindiVideoReferences, 
  /*  ja:, 
    zh:, 
    es:, 
    no:, 
    pt:,*/

}



export function getReferences(id: string | undefined, languageCode?: string): TReference[]
{
    console.log(languageCode)
    if(languageCode && translatedVideoReferences[languageCode])
    {
        
        return translatedVideoReferences[languageCode]
    }
    
    return translatedVideoReferences["en"];
}