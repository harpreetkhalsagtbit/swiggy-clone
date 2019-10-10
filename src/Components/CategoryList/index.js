import React from "react";

import CategoryItem from '../CategoryItem'
import "./index.css";

const CategoryList = React.memo(({ categories, selected, updateSelected }) => {
    return (
        <ul className="category-list">
            {categories.map((item, index) => {
                return <CategoryItem key={index} item={item} selected={selected} updateSelected={updateSelected}></CategoryItem>
            })}
        </ul>
    );
});

export default CategoryList;
