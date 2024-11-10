interface Departments {
    departmentId: number;
    displayName: string;
}

interface ResponseDepartments {
    departments: Departments[];
}

export async function getDepartments(): Promise<Departments[]> {
    const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/departments"
    );
    const resData = (await response.json()) as ResponseDepartments;
    if (!response.ok) {
        throw new Error("Failed to fetch departments data.");
    }
    return resData.departments;
}

interface ResponseObjects {
    total: number;
    objectIDs: number[];
}

export async function getObjects(paramObj?: {
    metadataDate?: string;
    departmentId?: string;
}): Promise<number[]> {
    let urlString =
        "https://collectionapi.metmuseum.org/public/collection/v1/objects";
    if (paramObj !== undefined) {
        if (paramObj.metadataDate !== undefined) {
            urlString = `${urlString}?metadataDate=${paramObj.metadataDate}`;
        }
        if (paramObj.departmentId !== undefined) {
            urlString = `${urlString}?departmentIds=${paramObj.departmentId}`;
        }
    }
    const response = await fetch(urlString);
    const resData = (await response.json()) as ResponseObjects;
    if (!response.ok) {
        throw new Error("Failed to fetch objects data.");
    }
    return resData.objectIDs;
}

export interface ResponseObject {
    objectID: number;
    isHighlight: boolean;
    accessionNumber: string;
    accessionYear: string;
    isPublicDomain: boolean;
    primaryImage: string;
    primaryImageSmall: string;
    additionalImages: string[];
    constituents: {
        constituentID: number;
        role: string;
        name: string;
        constituentULAN_URL: string;
        constituentWikidata_URL: string;
        gender: string;
    }[];
    department: string;
    objectName: string;
    title: string;
    culture: string;
    period: string;
    dynasty: string;
    reign: string;
    portfolio: string;
    artistRole: string;
    artistPrefix: string;
    artistDisplayName: string;
    artistDisplayBio: string;
    artistSuffix: string;
    artistAlphaSort: string;
    artistNationality: string;
    artistBeginDate: string;
    artistEndDate: string;
    artistGender: string;
    artistWikidata_URL: string;
    artistULAN_URL: string;
    objectDate: string;
    objectBeginDate: number;
    objectEndDate: number;
    medium: string;
    dimensions: string;
    dimensionsParsed: {
        element: string;
        dimensionType: string;
        dimension: number;
    }[];
    measurements: {
        elementName: string;
        elementDescription: string;
        elementMeasurements: { Height: number; Length: number; Width: number };
    }[];
    creditLine: string;
    geographyType: string;
    city: string;
    state: string;
    county: string;
    country: string;
    region: string;
    subregion: string;
    locale: string;
    locus: string;
    excavation: string;
    river: string;
    classification: string;
    rightsAndReproduction: string;
    linkResource: string;
    metadataDate: string;
    repository: string;
    objectURL: string;
    tags: { term: string; AAT_URL: string; Wikidata_URL: string }[];
    objectWikidata_URL: string;
    isTimelineWork: boolean;
    GalleryNumber: string;
}

export async function getObject(objectId: number): Promise<ResponseObject> {
    const urlString = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId.toString()}`;

    const response = await fetch(urlString);
    const resData = (await response.json()) as ResponseObject;
    if (!response.ok) {
        throw new Error("Failed to fetch object.");
    }
    return resData;
}
