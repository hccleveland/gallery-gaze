import { useEffect, useState, useRef } from "react";
import { Collection } from "../collectionApi";

export default function useFetchCollection(
    fetchFn: (param?: {
        metadataDate?: string;
        departmentId?: string;
    }) => Promise<Collection>,
    paramValue?: {
        metadataDate?: string;
        departmentId?: string;
    }
) {
    const [isFetching, setIsFetching] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [fetchedData, setFetchedData] = useState<Collection>({
        total: 0,
        objectIDs: [],
    });

    const paramObj = useRef(paramValue);

    useEffect(() => {
        async function fetchCollectionData() {
            setIsFetching(true);
            try {
                const data = await fetchFn(paramObj.current);
                setFetchedData(data);
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMsg(
                        error.message || "Failed to fetch Collection data."
                    );
                } else {
                    setErrorMsg(String(error));
                }
            } finally {
                setIsFetching(false);
            }
        }

        void fetchCollectionData();
    }, [fetchFn]);

    return {
        isFetching,
        errorMsg,
        fetchedData,
        setFetchedData,
    };
}
