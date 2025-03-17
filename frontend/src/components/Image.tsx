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

    if (!objectData) {
        return (
            <div className="image-spacing-container">
                <div className="image-main-container">
                    <img
                        src="https://images.metmuseum.org/CRDImages/ep/original/DT1418.jpg"
                        alt="Ancient Rome (Gallery Gaze Landing Image)"
                    />
                    <div>
                        <p>Ancient Rome - Giovanni Paolo Panini - 1757</p>
                        <p>
                            "The Metropolitan Museum of Art, New York, Gwynne
                            Andrews Fund, 1952"
                        </p>
                        <a href="https://www.metmuseum.org">
                            www.metmuseum.org
                        </a>
                    </div>
                </div>
            </div>
        );
    } else {
        return imageSrc !== "../default-image.png" ? (
            <div className="image-spacing-container">
                <div className="image-main-container">
                    <img src={imageSrc} alt="Main Image" />
                </div>
            </div>
        ) : (
            <div className="image-spacing-container">
                <div className="image-main-container missing-image">
                    <img src={imageSrc} alt="No Image Available" />
                    <p>No Image Available</p>
                </div>
            </div>
        );
    }
}
