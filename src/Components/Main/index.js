import React from "react";

import Aside from '../Aside'
import RestaurantList from '../RestaurantList'
import data from '../../data/reactTask'
import "./index.css";

class Main extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selected:'popular brands',
      disableScrollEvent: false
    }
    this.childGroupDomRef = []

    this.addChildRef = this.addChildRef.bind(this)
    this.updateSelected = this.updateSelected.bind(this)
    this.listenScrollEvent = this.listenScrollEvent.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenScrollEvent)
  }

  addChildRef (childRef) {
    // we need dom ref for scrol events
    // we are pushing ref from child to parent via state up method
    this.childGroupDomRef.push(childRef)
  }

  listenScrollEvent (e) {
    // Windows scroll event and chaning sccroll event on click
    // of category gets clashed, we need to prevent this default scroll
    // event when category is clicked
    if(!this.state.disableScrollEvent) {
      let found = this.childGroupDomRef.find((ref) => {
        return ref.domOffsetTop - window.scrollY + window.screen.availHeight - 200 > 0
      })

      if(found) {
        this.setState((previousState, previousProps) => {
          return {
            ...previousState,
            selected: found.title,
          };
        });  
      }
    }
  }

  updateSelected(item) {
    if(item != 'See All') {
      let found = this.childGroupDomRef.find((ref) => {
        return item == ref.title
      })
      this.setState((previousState, previousProps) => {
        return {
          ...previousState,
          disableScrollEvent:true
        };
      }, () => {
        window.scrollTo(0,found.domOffsetTop)
        this.setState((previousState, previousProps) => {
          return {
            ...previousState,
            disableScrollEvent:false
          };
        })
      })
    } else {
      console.log('se all')
      this.setState((previousState, previousProps) => {
        return {
          ...previousState,
          selected: item,
          disableScrollEvent:true
        };
      })

    }

  }

  render() {
    return (
      <main>
          <Aside data={data} selected={this.state.selected} updateSelected={this.updateSelected}></Aside>
          <RestaurantList data={data} selected={this.state.selected} addChildRef={this.addChildRef}></RestaurantList>
      </main>
    );
  }
};
export default Main;
