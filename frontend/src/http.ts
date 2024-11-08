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
