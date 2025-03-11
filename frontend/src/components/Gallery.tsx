import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/typedHooks";
import { fetchObjectFromCollection } from "../store/objectSlice";
import { collectionActions } from "../store/collectionSlice";
import Image from "./Image";
import Label from "./Label";

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
        <div className="gallery-container">
            <div className="gallery-collection-header">
                {collection.objectIDs.length > 0 && (
                    <h3>{`${collectionCurrentText} - ${collectionTotalText}`}</h3>
                )}
            </div>
            <div className="gallery-navigator">
                <div className="gallery-button-container">
                    {collection.objectIDs.length > 0 && (
                        <button
                            onClick={handleBackwardsClick}
                            className="gallery-backwards-button"
                        >
                            &#10502;
                        </button>
                    )}
                </div>
                <div className="gallery-frame">
                    <Image />
                    <Label />
                </div>
                <div className="gallery-button-container">
                    {collection.objectIDs.length > 0 && (
                        <button
                            onClick={handleForwardClick}
                            className="gallery-forward-button"
                        >
                            &#10503;
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
