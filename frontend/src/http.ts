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
