import React from "react";

import "./index.css";

const ShowMoreTile = ({ remainingItems, showMore }) => {
    let showMorehandler = () => {
        showMore()
    }
    return (
        <div className="show-more-tile">
            <div className="show-more-title" onClick={showMorehandler}>
                <span href="">+{remainingItems} More</span>
            </div>
        </div>
    )
};
export default ShowMoreTile;
