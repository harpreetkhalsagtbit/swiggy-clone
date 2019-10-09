import React from "react";

import "./index.css";
import RestaurantTile from "../RestaurantTile"

const RestaurantGroup = ({group}) => {
  return (
    <div className="restaurant-group">
        <div className="restaurant-group-title">{group.category}</div>
        <div className="restaurant-group-list-container">
          {group.restaurantList.map((restaurant, index) => {
            return <RestaurantTile key={index} restaurant={restaurant}></RestaurantTile>
          })}
        </div>
        {/* <RestaurantList restaurantList={group.restaurantList}></RestaurantList> */}
    </div>
  );
};
export default RestaurantGroup;
