import { useAppSelector } from "../store/typedHooks";

export default function Gallery() {
    const collection = useAppSelector((state) => state.collection);
    const collectionTotalText = collection.total.toLocaleString();
    const collectionCurrentText = (
        collection.currentIndex + 1
    ).toLocaleString();

    return (
        <div>
            <h3>{`${collectionCurrentText} - ${collectionTotalText}`}</h3>
        </div>
    );
}
