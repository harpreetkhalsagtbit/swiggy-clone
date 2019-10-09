import React from "react";

import CategoryItem from '../CategoryItem'
import "./index.css";

const CategoryList = ({ categories }) => {
    return (
        <ul className="category-list">
            {categories.map((item, index) => {
                return <CategoryItem key={index} item={item}></CategoryItem>
            })}
        </ul>
    );
};

export default CategoryList;
