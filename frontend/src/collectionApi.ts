export interface Department {
    departmentId: number;
    displayName: string;
}

export async function getDepartments(): Promise<Department[]> {
    const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/departments"
    );
    const resData = (await response.json()) as { departments: Department[] };
    if (!response.ok) {
        throw new Error("Failed to fetch departments data.");
    }
    return resData.departments;
}

export interface Collection {
    total: number;
    objectIDs: number[];
}

export async function getCollection(paramObj?: {
    metadataDate?: string;
    departmentId?: string;
}): Promise<Collection> {
    let urlString =
        "https://collectionapi.metmuseum.org/public/collection/v1/objects";
    if (paramObj !== undefined) {
        if (
            paramObj.metadataDate !== undefined &&
            paramObj.departmentId !== undefined
        ) {
            urlString = `${urlString}?metadataDate=${paramObj.metadataDate}&departmentIDs=${paramObj.departmentId}`;
        }
        if (paramObj.metadataDate !== undefined) {
            urlString = `${urlString}?metadataDate=${paramObj.metadataDate}`;
        }
        if (paramObj.departmentId !== undefined) {
            urlString = `${urlString}?departmentIds=${paramObj.departmentId}`;
        }
    }
    const response = await fetch(urlString);
    const resData = (await response.json()) as Collection;
    if (!response.ok) {
        throw new Error("Failed to fetch collection data.");
    }
    return resData;
}

export interface Object {
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

export async function getObject(objectId: number): Promise<Object> {
    const urlString = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId.toString()}`;

    const response = await fetch(urlString);
    const resData = (await response.json()) as Object;
    if (!response.ok) {
        throw new Error("Failed to fetch object data.");
    }
    return resData;
}
