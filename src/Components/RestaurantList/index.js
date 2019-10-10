import React from "react";

import "./index.css";
import RestaurantGroup from "../RestaurantGroup"
import RestaurantTile from "../RestaurantTile"

const RestaurantList = ({data, selected, addChildRef}) => {
  let list = sanitizeData(data)
  console.log(selected)
  return (
    <div className="restaurant-list">
      {isSeeAll(data, selected, list, addChildRef)}
    </div>
  );
};

function isSeeAll (data, selected, list, addChildRef) {
  if(selected != 'See All') {
    return list.map((category, index) => {
      return <RestaurantGroup key={index} group={category} selected={selected} addChildRef={addChildRef}></RestaurantGroup>
    })
  } else {
    return (
      <div className="restaurant-group">
        <div className="restaurant-group-title">See All</div>
        <div className="restaurant-group-list-container">
          {data.map((category, parentIndex) => {
            return (
                category.restaurantList.map((restaurant, index) => {
                  return(
                      <RestaurantTile key={parentIndex + '_' + index} restaurant={restaurant}></RestaurantTile>
                  )
                })
            )
          })}
        </div>
      </div>
    )
  }
}
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
