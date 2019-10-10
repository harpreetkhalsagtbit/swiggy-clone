import React from "react";

import "./index.css";
import RestaurantGroup from "../RestaurantGroup"
import RestaurantTile from "../RestaurantTile"
import EmptyTile from "../EmptyTile"

const RestaurantList = ({data, selected, addChildRef}) => {
  let list = sanitizeData(data)
  let total = list.reduce((acc, item) => {
    if(item.category != 'Only on Swiggy') {
      acc += item.restaurantList.length
    }
    return acc;
  }, 0)
  return (
    <div className="restaurant-list">
      {renderRestaurantList(data, selected, list, addChildRef, total)}
    </div>
  );
};

function renderRestaurantList (data, selected, list, addChildRef, total) {
  if(selected != 'See All') {
    return list.map((category, index) => {
      return <RestaurantGroup key={index} group={category} selected={selected} addChildRef={addChildRef}></RestaurantGroup>
    })
  } else {
    console.log(total, 'total')
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
          {
            (total % 3 == 2) ? <EmptyTile></EmptyTile> : ''
          }

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
