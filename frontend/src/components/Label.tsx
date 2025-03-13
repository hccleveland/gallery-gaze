import { useAppSelector } from "../store/typedHooks";

export default function Label() {
    const { objectData } = useAppSelector((state) => state.object);

    if (objectData) {
        const objectIdString = objectData.objectID.toString();

        return (
            <div className="label-main-container">
                <p className="label-objectID">{`Digital ID: ${objectIdString}`}</p>
                <div className="label-artist-container">
                    {objectData.artistDisplayName && (
                        <h4>{objectData.artistDisplayName}</h4>
                    )}
                    {objectData.artistDisplayBio && (
                        <p>{objectData.artistDisplayBio}</p>
                    )}
                </div>
                <div className="label-title-container">
                    <h3>{objectData.title}</h3>
                    {objectData.objectDate && <p>{objectData.objectDate}</p>}
                </div>
                <div className="label-detail-container">
                    {objectData.medium && <h5>{objectData.medium}</h5>}
                    {objectData.dimensions && <p>{objectData.dimensions}</p>}
                    {objectData.creditLine && <p>{objectData.creditLine}</p>}
                </div>
            </div>
        );
    }
}
