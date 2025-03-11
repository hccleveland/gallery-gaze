import { useState, useEffect } from "react";
import { useAppSelector } from "../store/typedHooks";

export default function Image() {
    const [imageSrc, setImageSrc] = useState("../default-image.png");

    const { objectData } = useAppSelector((state) => state.object);

    useEffect(() => {
        const fetchedPrimarySrc =
            objectData === undefined ? "" : objectData.primaryImage;
        const usableImgSrc =
            fetchedPrimarySrc !== ""
                ? fetchedPrimarySrc
                : "../default-image.png";
        setImageSrc(usableImgSrc);
    }, [objectData]);

    if (objectData) {
        return imageSrc !== "../default-image.png" ? (
            <div className="image-main-container">
                <img src={imageSrc} alt="Main Image" />
            </div>
        ) : (
            <div className="image-main-container missing-image">
                <img src={imageSrc} alt="No Image Available" />
                <p>No Image Available</p>
            </div>
        );
    }
}
