import { useState, useEffect } from "react";
import { Object } from "../collectionApi";

export default function useFetchObject(
    fetchFn: (objectId: number) => Promise<Object>,
    paramValue: number
) {
    const [isFetching, setIsFetching] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [fetchedData, setFetchedData] = useState<Object>();

    useEffect(() => {
        async function fetchObjectData() {
            setIsFetching(true);
            try {
                const data = await fetchFn(paramValue);
                setFetchedData(data);
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMsg(
                        error.message || "Failed to fetch Object data."
                    );
                } else {
                    setErrorMsg(String(error));
                }
            } finally {
                setIsFetching(false);
            }
        }

        void fetchObjectData();
    }, [fetchFn, paramValue]);

    return {
        isFetching,
        errorMsg,
        fetchedData,
        setFetchedData,
    };
}
