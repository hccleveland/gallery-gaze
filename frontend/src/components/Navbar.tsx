import { useState, useEffect } from "react";
import { Department, getDepartments } from "../collectionApi";

const initialDepartmentsData: Department[] = [
    { departmentId: 0, displayName: "Choose a Collection" },
];

export default function Navbar() {
    const [isFetching, setIsFetching] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [departmentsData, setDepartmentsData] = useState(
        initialDepartmentsData
    );

    useEffect(() => {
        async function fetchDepartmentsData() {
            setIsFetching(true);
            try {
                const data = await getDepartments();
                setDepartmentsData((prevDepartsData) => [
                    prevDepartsData[0],
                    ...data,
                ]);
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMsg(
                        error.message || "Failed to fetch Departments data."
                    );
                } else {
                    setErrorMsg(String(error));
                }
            } finally {
                setIsFetching(false);
            }
        }

        void fetchDepartmentsData();
    }, []);

    return (
        <nav>
            <h1>Gallery Gaze</h1>
            <div>
                {isFetching && <p>Loading collections...</p>}
                {errorMsg && (
                    <p>Couldn't load collections, please try again.</p>
                )}
                {!isFetching && !errorMsg && (
                    <ul>
                        {departmentsData.map((department) => (
                            <li key={department.departmentId}>
                                {department.displayName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    );
}
