import React from "react";
import "./index.css";
import CategoryList from '../CategoryList'
const AsideLeft = ({data}) => {
  let categories = sanitizeData(data)

  return (
    <aside>
      <CategoryList categories={categories}></CategoryList>
    </aside>
  );
};

function sanitizeData(data) {
  let total = 0;
  let swiggyOnly = 0;
  let categories = data.map((item) => {
    total += item.restaurantList.length

    item.restaurantList.map((restaurant) => {
      // typo in json isExclusive
      if(restaurant.isExlusive) {
        swiggyOnly++;
      }
    })
    return {
      category: item.category,
      count:item.restaurantList.length
    }
  })
  categories = categories.concat([{
    category: 'Only on Swiggy',
    count: swiggyOnly
  }, {
    category: 'See All',
    count: total
  }])
  return categories;
}

export default AsideLeft;
