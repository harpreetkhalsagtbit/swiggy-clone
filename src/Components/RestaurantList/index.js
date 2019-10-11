import React from "react";

import "./index.css";
import RestaurantGroup from "../RestaurantGroup"
import RestaurantTile from "../RestaurantTile"
import EmptyTile from "../EmptyTile"

const RestaurantList = ({data, selected, addChildRef}) => {
  let list = sanitizeData(data)
  // Get Total for Swiggy Only By Filtering
  // it across all the current categories
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
  // Separete View for See All Category needed with no categories
  // For all other categories, view of If will render
  if(selected != 'See All') {
    return list.map((category, index) => {
      // Categories wise view needed, so added a Parent Componet to group list of restaurants.
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
          {
            /*
              Hack:
              Not able to manage things with CSS for two items,
              two items were center aligned instead of stack to left keeping space for third item
              so added an empty tile if the last row has two items.
            */
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
