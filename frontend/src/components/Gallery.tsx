import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/typedHooks";
import { fetchObjectFromCollection } from "../store/objectSlice";
import { collectionActions } from "../store/collectionSlice";
import Image from "./Image";
import Label from "./Label";
import Introduction from "./Introduction";

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

    const handleLinearToggle = () => {
        if (collection.objectIDs.length > 0) {
            dispatch(collectionActions.setProgressionToggle("linear"));
        }
    };

    const handleRandomizedToggle = () => {
        if (collection.objectIDs.length > 0) {
            dispatch(collectionActions.setProgressionToggle("randomized"));
        }
    };

    const handleForwardClick = () => {
        if (collection.objectIDs.length > 0 && !collection.moveRandomized) {
            dispatch(collectionActions.moveNextIndex());
        }
        if (collection.objectIDs.length > 0 && collection.moveRandomized) {
            dispatch(collectionActions.moveNextRandomizedIndex());
        }
    };

    const handleBackwardsClick = () => {
        if (collection.objectIDs.length > 0 && !collection.moveRandomized) {
            dispatch(collectionActions.movePrevIndex());
        }
        if (collection.objectIDs.length > 0 && collection.moveRandomized) {
            dispatch(collectionActions.movePrevRandomizedIndex());
        }
    };

    return (
        <div className="gallery-container">
            {collection.objectIDs.length === 0 ? (
                <>
                    <div className="gallery-navigator">
                        <div className="gallery-button-container empty-button-container"></div>
                        <div className="gallery-frame">
                            <Image />
                            <Introduction />
                        </div>
                        <div className="gallery-button-container empty-button-container"></div>
                    </div>
                </>
            ) : (
                <>
                    <div className="gallery-collection-header">
                        <h3>{`Viewing ${collectionCurrentText} of ${collectionTotalText}`}</h3>
                        <div className="gallery-collection-toggles">
                            <span>Currently Browsing:</span>
                            {collection.moveRandomized ? (
                                <button onClick={handleLinearToggle}>
                                    Ordered
                                </button>
                            ) : (
                                <button
                                    onClick={handleLinearToggle}
                                    className="active-toggle"
                                >
                                    Ordered
                                </button>
                            )}
                            {collection.moveRandomized ? (
                                <button
                                    onClick={handleRandomizedToggle}
                                    className="active-toggle"
                                >
                                    Randomized
                                </button>
                            ) : (
                                <button onClick={handleRandomizedToggle}>
                                    Randomized
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="gallery-navigator">
                        <div className="gallery-button-container">
                            <button
                                onClick={handleBackwardsClick}
                                className="gallery-backwards-button"
                            >
                                &#10502;
                            </button>
                        </div>
                        <div className="gallery-frame">
                            <Image />
                            <Label />
                        </div>
                        <div className="gallery-button-container">
                            <button
                                onClick={handleForwardClick}
                                className="gallery-forward-button"
                            >
                                &#10503;
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
