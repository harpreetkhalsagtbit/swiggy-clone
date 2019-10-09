import React from "react";

import "./index.css";
const CategoryItem = ({ index, item }) => {
    return <li className="item" key={index}>
        <div className="title">{item.category}</div>
        <div className="desc">{item.count} Options</div>
    </li>
};

export default CategoryItem;
