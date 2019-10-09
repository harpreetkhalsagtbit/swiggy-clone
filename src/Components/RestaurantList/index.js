import React from "react";

import "./index.css";
import RestaurantGroup from "../RestaurantGroup"

const RestaurantList = ({data}) => {
  let list = sanitizeData(data)
  return (
    <div className="restaurant-list">
        {list.map((category, index) => {
          return <RestaurantGroup key={index} group={category}></RestaurantGroup>
        })}
    </div>
  );
};

function sanitizeData(data) {
  let swiggyOnly = [];
  let categories = data.map((item) => {
    item.restaurantList.map((restaurant) => {
      // typo in json isExclusive
      if(restaurant.isExlusive) {
        swiggyOnly.push(restaurant);
      }
    })
    return item
  })
  categories.push({
    category: 'Only on Swiggy',
    restaurantList: swiggyOnly
  })
  return categories;
}

export default RestaurantList;
