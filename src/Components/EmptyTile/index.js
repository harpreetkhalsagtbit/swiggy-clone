import React from "react";

const EmptyTile = ({ empty = {food_types:[]} }) => {
    return (
        <div className="empty-tile" style={{width:"320px"}}>
        </div>
    )
};
export default EmptyTile;
