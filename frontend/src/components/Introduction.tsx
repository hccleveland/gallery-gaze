export default function Introduction() {
    return (
        <div className="label-main-container">
            <h2 className="intro-title">
                Welcome to <span>Gallery Gaze</span>
            </h2>
            <h3 className="intro-headline">
                Explore the Metropolitan Museum of Art's Open Access Collection.
            </h3>
            <p className="intro-explanation">
                With data for more than 470,000 objects, spanning over 5,000
                years of art, <span>Gallery Gaze</span> provides a simple
                navigator for these datasets. Discover previous favorites and be
                inspired by new works and artists while wandering the
                collection.
            </p>
            <p className="intro-explanation">
                To get started, hover over "Choose a Collection" above and click
                on one of the Collections that will appear in the dropdown list
                below.
            </p>
            <p className="intro-explanation">
                While in a collection, the current and total objects will be
                displayed above and the object's label and image (when
                available) will be also be shown.
            </p>
            <p className="intro-explanation">
                The left and right buttons allow for moving forwards and
                backwards through the current collection. Collections can be
                changed at any time by hovering over the current Collection and
                clicking on a new one below. Clicking on{" "}
                <span>Gallery Gaze</span> will bring you back to this
                introduction.
            </p>
        </div>
    );
}
