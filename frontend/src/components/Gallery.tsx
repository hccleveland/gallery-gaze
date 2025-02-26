import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/typedHooks";
import { fetchObjectFromCollection } from "../store/objectSlice";

export default function Gallery() {
    const dispatch = useAppDispatch();
    const collection = useAppSelector((state) => state.collection);
    const objectStore = useAppSelector((state) => state.object);

    const collectionTotalText = collection.total.toLocaleString();
    const collectionCurrentText = (
        collection.currentIndex + 1
    ).toLocaleString();

    useEffect(() => {
        if (collection.objectIDs.length > 0) {
            void dispatch(
                fetchObjectFromCollection(
                    collection.objectIDs[collection.currentIndex]
                )
            );
        }
    }, [collection.objectIDs, collection.currentIndex, dispatch]);

    console.log(collection, objectStore);

    return (
        <div>
            <h3>{`${collectionCurrentText} - ${collectionTotalText}`}</h3>
        </div>
    );
}
