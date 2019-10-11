import React from "react";

import "./index.css";
import RestaurantTile from "../RestaurantTile"
import EmptyTile from "../EmptyTile"
import ShowMoreTile from "../ShowMoreTile"

// const RestaurantGroup = ({group, selected}) => {
class RestaurantGroup extends React.PureComponent {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.limit = 5;
    this.newRowCount = 2;
    this.itemEachRow = 3;
    this.length = this.props.group.restaurantList.length

    // Need to show max five items per category by-default
    // remainingItems is used for displaying count of items not visible
    this.state = {
      list: this.props.group.restaurantList.slice(0, this.limit),
      remainingItems: this.length - this.limit
    }
    this.showMore = this.showMore.bind(this)
  }

  componentDidMount() {
    this.props.addChildRef({
      domRef: this.myRef,
      title: this.props.group.category
    })
  }

  showMore() {
    // Add atmost two more rows
    this.limit += (this.newRowCount * this.itemEachRow)
    this.limit > this.props.group.restaurantList? this.length: this.limit
    this.state = {
      list: this.props.group.restaurantList.slice(0, this.limit),
      remainingItems: this.length - this.limit
    }
    this.setState({
      list: this.props.group.restaurantList.slice(0, this.limit),
      remainingItems: this.length - this.limit > 0 ? this.length - this.limit:0
    })

  }

  render() {
    return (
      <div ref={this.myRef} className="restaurant-group">
        <div className="restaurant-group-title">{this.props.group.category}</div>
        <div className="restaurant-group-list-container">
          {this.state.list.map((restaurant, index) => {
            return <RestaurantTile key={index} restaurant={restaurant}></RestaurantTile>
          })}
          {this.state.remainingItems?
          <ShowMoreTile remainingItems={this.state.remainingItems} showMore={this.showMore}></ShowMoreTile>
            :""
          }
          {
            /*
              Hack:
              Not able to manage things with CSS for two items,
              two items were center aligned instead of stack to left keeping space for third item
              so added an empty tile if the last row has two items.
            */
            (!this.state.remainingItems && this.state.list.length % 3 == 2) ? <EmptyTile></EmptyTile> : ''
          }

        </div>
      </div>
    );
  }
};
export default RestaurantGroup;
