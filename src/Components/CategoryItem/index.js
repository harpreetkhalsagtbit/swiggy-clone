import React from "react";

import "./index.css";
const CategoryItem = React.memo(({ item, index, selected, updateSelected }) => {
    const select = function() {
        updateSelected(item.category)
    }
    console.log("rendering")
    return <li className={`${selected==item.category?'active':'item'}`} key={index} onClick={select}>
        <div className="title">{item.category}</div>
        <div className="desc">{item.count} Options</div>
    </li>
});

export default CategoryItem;
