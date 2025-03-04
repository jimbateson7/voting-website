import {TReference} from "../../components/VideoReferenceControl";

const frenchVideoReferences = [
    { time: 19, title: "Le pire des cas raisonnable", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-1-the-reasonable-worst-case.pdf" },
    { time: 26, title: "Terre serre chaude", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-2-hothouse-earth.pdf" },
    { time: 64, title: "Le déséquilibre énergétique", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-3-the-energy-imbalance.pdf" },
    { time: 130, title: "Détail des chiffres utilisés", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-4-detail-of-numbers.pdf" },
    { time: 182, title: "L'enquête", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-5-the-investigation.pdf" },
    { time: 468, title: "Trois sujets de préoccupation", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-6-three-areas.pdf" },
    { time: 723, title: "Conclusions", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-7-conclusions.pdf" },
    { time: 752, title: "Donate", pdfLink: "https://ourplanetourpeople.com/en/donate" }
];

const dutchVideoReferences = [
    { time: 19, title: "Het redelijke worstcasescenario", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-1-the-reasonable-worst-case.pdf" },
    { time: 26, title: "Broeikas Aarde", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-2-hothouse-earth.pdf" },
    { time: 64, title: "De energie-onbalans", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-3-the-energy-imbalance.pdf" },
    { time: 130, title: "Details van de gebruikte cijfers", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-4-detail-of-numbers.pdf" },
    { time: 182, title: "Het onderzoek", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-5-the-investigation.pdf" },
    { time: 468, title: "Drie aandachtspunten", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-6-three-areas.pdf" },
    { time: 723, title: "Conclusies", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-7-conclusions.pdf" },
    { time: 752, title: "Donate", pdfLink: "https://ourplanetourpeople.com/en/donate" }
];

const serbianVideoReferences = [
    { time: 19, title: "Razuman najgori scenario", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-1-the-reasonable-worst-case.pdf" },
    { time: 26, title: "Staklena bašta Zemlja", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-2-hothouse-earth.pdf" },
    { time: 64, title: "Energetski disbalans", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-3-the-energy-imbalance.pdf" },
    { time: 130, title: "Detalji korišćenih brojeva", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-4-detail-of-numbers.pdf" },
    { time: 182, title: "Istraga", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-5-the-investigation.pdf" },
    { time: 468, title: "Tri oblasti zabrinutosti", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-6-three-areas.pdf" },
    { time: 723, title: "Zaključci", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-7-conclusions.pdf" },
    { time: 752, title: "Donate", pdfLink: "https://ourplanetourpeople.com/en/donate" }
];

const hindiVideoReferences = [
    { time: 19, title: "उचित सबसे खराब स्थिति", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-1-the-reasonable-worst-case.pdf" },
    { time: 26, title: "ग्रीनहाउस पृथ्वी", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-2-hothouse-earth.pdf" },
    { time: 64, title: "ऊर्जा असंतुलन", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-3-the-energy-imbalance.pdf" },
    { time: 130, title: "उपयोग किए गए नंबरों का विवरण", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-4-detail-of-numbers.pdf" },
    { time: 182, title: "जाँच", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-5-the-investigation.pdf" },
    { time: 468, title: "चिंता के तीन क्षेत्र", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-6-three-areas.pdf" },
    { time: 723, title: "निष्कर्ष", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-7-conclusions.pdf" },
    { time: 752, title: "Donate", pdfLink: "https://ourplanetourpeople.com/en/donate" }
];

const japaneseVideoReferences = [
    { time: 19, title: "合理的な最悪のシナリオ", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-1-the-reasonable-worst-case.pdf" },
    { time: 26, title: "温室地球", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-2-hothouse-earth.pdf" },
    { time: 64, title: "エネルギー不均衡", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-3-the-energy-imbalance.pdf" },
    { time: 130, title: "使用された数値の詳細", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-4-detail-of-numbers.pdf" },
    { time: 182, title: "調査", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-5-the-investigation.pdf" },
    { time: 468, title: "懸念される3つの分野", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-6-three-areas.pdf" },
    { time: 723, title: "結論", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-7-conclusions.pdf" },
    { time: 752, title: "Donate", pdfLink: "https://ourplanetourpeople.com/en/donate" }
];

const chineseVideoRefrences = [
    { time: 19, title: "合理的的最坏情况", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-1-the-reasonable-worst-case.pdf" },
    { time: 26, title: "温室地球", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-2-hothouse-earth.pdf" },
    { time: 64, title: "能量失衡", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-3-the-energy-imbalance.pdf" },
    { time: 130, title: "使用的数字的详细信息", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-4-detail-of-numbers.pdf" },
    { time: 182, title: "调查", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-5-the-investigation.pdf" },
    { time: 468, title: "三个关注领域", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-6-three-areas.pdf" },
    { time: 723, title: "结论", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-7-conclusions.pdf" },
    { time: 752, title: "Donate", pdfLink: "https://ourplanetourpeople.com/en/donate" }
];
const spanishVideoReferences = [
    { time: 19, title: "El peor escenario razonable", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-1-the-reasonable-worst-case.pdf" },
    { time: 26, title: "Tierra invernadero", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-2-hothouse-earth.pdf" },
    { time: 64, title: "El desequilibrio energético", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-3-the-energy-imbalance.pdf" },
    { time: 130, title: "Detalle de los números utilizados", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-4-detail-of-numbers.pdf" },
    { time: 182, title: "La investigación", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-5-the-investigation.pdf" },
    { time: 468, title: "Tres áreas de preocupación", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-6-three-areas.pdf" },
    { time: 723, title: "Conclusiones", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-7-conclusions.pdf" },
    { time: 752, title: "Donate", pdfLink: "https://ourplanetourpeople.com/en/donate" }
];

const norwayVideoReferences = [
    { time: 19, title: "Det rimelige verste tilfellet", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-1-the-reasonable-worst-case.pdf" },
    { time: 26, title: "Drivhusjorden", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-2-hothouse-earth.pdf" },
    { time: 64, title: "Energiubalansen", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-3-the-energy-imbalance.pdf" },
    { time: 130, title: "Detaljer om tallene som brukes", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-4-detail-of-numbers.pdf" },
    { time: 182, title: "Etterforskningen", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-5-the-investigation.pdf" },
    { time: 468, title: "Tre bekymringsområder", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-6-three-areas.pdf" },
    { time: 723, title: "Konklusjoner", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-7-conclusions.pdf" },
    { time: 752, title: "Donate", pdfLink: "https://ourplanetourpeople.com/en/donate" }
];

const portualgalVideoReference = [
    { time: 19, title: "O pior cenário razoável", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-1-the-reasonable-worst-case.pdf" },
    { time: 26, title: "Terra estufa", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-2-hothouse-earth.pdf" },
    { time: 64, title: "O desequilíbrio energético", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-3-the-energy-imbalance.pdf" },
    { time: 130, title: "Detalhe dos números utilizados", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-4-detail-of-numbers.pdf" },
    { time: 182, title: "A investigação", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-5-the-investigation.pdf" },
    { time: 468, title: "Três áreas de preocupação", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-6-three-areas.pdf" },
    { time: 723, title: "Conclusões", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-7-conclusions.pdf" },
    { time: 752, title: "Donate", pdfLink: "https://ourplanetourpeople.com/en/donate" }
];


const translatedVideoReferences: { [key: string]: { time: number; title: string; pdfLink: string }[] } = {
    en: [
        { time: 19, title: "The Reasonable Worst Case", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-1-the-reasonable-worst-case.pdf" },
        { time: 26, title: "Hothouse Earth", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-2-hothouse-earth.pdf" },
        { time: 64, title: "The Energy Imbalance", pdfLink: "https://www.datocms-assets.com/136385/1741096043-4499-3-the-energy-imbalance.pdf" },
        { time: 130, title: "Detail of the numbers used", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-4-detail-of-numbers.pdf" },
        { time: 182, title: "The Investigation", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-5-the-investigation.pdf" },
        { time: 468, title: "Three areas of concern", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-6-three-areas.pdf" },
        { time: 723, title: "Conclusions", pdfLink: "https://www.datocms-assets.com/136385/1739562418-4499-7-conclusions.pdf" },
        { time: 752, title: "Donate", pdfLink: "https://ourplanetourpeople.com/en/donate" }
    ],
    fr:frenchVideoReferences,
    nl:dutchVideoReferences,
    sr: serbianVideoReferences, 
    hi: hindiVideoReferences, 
    ja: japaneseVideoReferences , 
    zh: chineseVideoRefrences, 
    es: spanishVideoReferences, 
    no: norwayVideoReferences, 
    pt: portualgalVideoReference,

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