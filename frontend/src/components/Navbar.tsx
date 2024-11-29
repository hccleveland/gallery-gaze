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

    const handleDepartmentSelection = (departId: number) => {
        const selectedDepartment = departmentsData.find(
            (depart) => depart.departmentId === departId
        );
        if (selectedDepartment === undefined) {
            throw new TypeError(
                "The selected department ID can't be found in departmentsData."
            );
        }
        const filteredDepartments = departmentsData.filter(
            (department) =>
                department.departmentId !== 0 &&
                department.departmentId !== departId
        );
        const sortedFilteredDepartments = filteredDepartments.sort(
            (a, b) => a.departmentId - b.departmentId
        );
        setDepartmentsData([selectedDepartment, ...sortedFilteredDepartments]);
    };

    const handleDepartmentsReset = () => {
        const sortedDepartments = [...departmentsData].sort(
            (a, b) => a.departmentId - b.departmentId
        );
        setDepartmentsData([...initialDepartmentsData, ...sortedDepartments]);
    };

    return (
        <nav>
            <h1 onClick={handleDepartmentsReset}>Gallery Gaze</h1>
            <div>
                {isFetching && <p>Loading collections...</p>}
                {errorMsg && (
                    <p>Couldn't load collections, please try again.</p>
                )}
                {!isFetching && !errorMsg && (
                    <ul>
                        {departmentsData.map((department) => (
                            <li key={department.departmentId}>
                                {departmentsData[0].departmentId ===
                                department.departmentId ? (
                                    <p>{department.displayName}</p>
                                ) : (
                                    <button
                                        onClick={() => {
                                            handleDepartmentSelection(
                                                department.departmentId
                                            );
                                        }}
                                    >
                                        {department.displayName}
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    );
}
