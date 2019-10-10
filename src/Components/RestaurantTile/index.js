import React from "react";

import "./index.css";

const RestaurantTile = ({ restaurant }) => {
    return (
        <div className="restaurant-tile">
            <a href="#" className="restaurant-tile-wrapper">
                <div className="restaurant-tile-body">
                    <div className="">
                        <div className="restaurant-tile-body-image-wrapper"><img className="" alt="Frozen Bottle" width="254" height="160" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/b6bsido84405494xesjy" /></div>
                        <div className="restaurant-tile-body-title-wrapper">
                            <div className="restaurant-tile-body-title">{restaurant.name}</div>
                            <div className="restaurant-tile-body-subtitle" title={restaurant.food_types.join(', ')}>{restaurant.food_types.join(', ')}</div>
                        </div>
                        <div className="restaurant-tile-body-desc-wrapper">
                            <div className="restaurant-tile-body-desc-ratings"><span className="icon-star"></span><span>{restaurant.ratings || "N/A"}</span></div>
                            <div>•</div>
                            <div>{restaurant.delivery_time}</div>
                            <div>•</div>
                            <div className="">₹{restaurant.price_for_two} FOR TWO</div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
};
export default RestaurantTile;
