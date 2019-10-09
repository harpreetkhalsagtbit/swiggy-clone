import React from "react";

import Aside from '../Aside'
import RestaurantList from '../RestaurantList'
import data from '../../data/reactTask'
import "./index.css";

const Main = () => {
  return (
    <main>
        <Aside data={data}></Aside>
        <RestaurantList data={data}></RestaurantList>
    </main>
  );
};
export default Main;
