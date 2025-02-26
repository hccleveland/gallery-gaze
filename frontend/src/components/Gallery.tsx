import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/typedHooks";
import { fetchObjectFromCollection } from "../store/objectSlice";
import { collectionActions } from "../store/collectionSlice";

export default function Gallery() {
    const dispatch = useAppDispatch();
    const collection = useAppSelector((state) => state.collection);
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

    const handleForwardClick = () => {
        if (collection.objectIDs.length > 0) {
            dispatch(collectionActions.moveNextIndex());
        }
    };

    const handleBackwardsClick = () => {
        if (collection.objectIDs.length > 0) {
            dispatch(collectionActions.movePrevIndex());
        }
    };

    return (
        <>
            <div>
                {collection.objectIDs.length > 0 && (
                    <h3>{`${collectionCurrentText} - ${collectionTotalText}`}</h3>
                )}
            </div>
            <div>
                {collection.objectIDs.length > 0 && (
                    <button onClick={handleBackwardsClick}>{"<"}</button>
                )}
                <div></div>
                {collection.objectIDs.length > 0 && (
                    <button onClick={handleForwardClick}>{">"}</button>
                )}
            </div>
        </>
    );
}
