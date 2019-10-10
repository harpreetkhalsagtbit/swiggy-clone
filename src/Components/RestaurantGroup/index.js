import React from "react";

import "./index.css";
import RestaurantTile from "../RestaurantTile"

// const RestaurantGroup = ({group, selected}) => {
class RestaurantGroup extends React.PureComponent {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  componentDidMount() {
    // it was slow pushing complete dom ref,
    // so instead pusing top offset
    this.props.addChildRef({
      domOffsetTop: this.myRef.current.offsetTop,
      domOffsetHeight: this.myRef.current.offsetHeight,
      title: this.props.group.category
    })
  }

  render() {
    return (
      <div ref={this.myRef} className="restaurant-group">
        <div className="restaurant-group-title">{this.props.group.category}</div>
        <div className="restaurant-group-list-container">
          {this.props.group.restaurantList.map((restaurant, index) => {
            return <RestaurantTile key={index} restaurant={restaurant}></RestaurantTile>
          })}
        </div>
      </div>
    );
  }
};
export default RestaurantGroup;
