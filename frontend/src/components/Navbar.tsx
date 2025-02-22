import { useState, useEffect } from "react";
import { Department, getDepartments } from "../collectionApi";
import type { RootState } from "../store/index";
import { useSelector } from "react-redux";

const initialDepartmentsData: Department[] = [
    { departmentId: 0, displayName: "Choose a Collection" },
];

export default function Navbar() {
    const [isFetching, setIsFetching] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [departmentsData, setDepartmentsData] = useState(
        initialDepartmentsData
    );
    const collection = useSelector((state: RootState) => state.collection);
    const collectionTotalText = collection.total.toString();

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
        const fetchedDepartments = [...departmentsData].filter(
            (department) => department.displayName !== "Choose a Collection"
        );
        const sortedDepartments = fetchedDepartments.sort(
            (a, b) => a.departmentId - b.departmentId
        );
        setDepartmentsData([...initialDepartmentsData, ...sortedDepartments]);
    };

    return (
        <nav>
            <button
                className="navbar-brand hover-underline"
                onClick={handleDepartmentsReset}
            >
                Gallery Gaze
            </button>
            <div className="navbar-collections">
                {isFetching && <p>Loading collections...</p>}
                {errorMsg && (
                    <p>Couldn't load collections, please try again.</p>
                )}
                {!isFetching && !errorMsg && (
                    <div className="navbar-collections-dropdown">
                        <h2 className="navbar-collections-header">
                            {`${departmentsData[0].displayName} - ${collectionTotalText}`}
                        </h2>
                        <ul className="navbar-collections-menu">
                            {departmentsData.slice(1).map((department) => (
                                <li key={department.departmentId}>
                                    <button
                                        onClick={() => {
                                            handleDepartmentSelection(
                                                department.departmentId
                                            );
                                        }}
                                    >
                                        {department.displayName}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}
