import React from "react";

import Aside from '../Aside'
import RestaurantList from '../RestaurantList'
import data from '../../data/reactTask'
import "./index.css";

class Main extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data,
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
    // we need dom ref for scrrol events
    // we are pushing ref from child to parent via state up method
    this.childGroupDomRef.push(childRef)
  }

  listenScrollEvent (e) {
    // Windows scroll event and changing sccroll event on click
    // of category gets clashed, we need to prevent this default scroll
    // event when category is clicked
    if(!this.state.disableScrollEvent) {
      // get nearest group
      let found = this.childGroupDomRef.find((ref) => {  
        return ref.domRef.current.offsetTop - window.scrollY + window.screen.availHeight - 200 > 0
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
        // if RestaurantList component is not Unmounted - By clicking on Select All
        if(found.domRef.current) {
          window.scrollTo(0,found.domRef.current.offsetTop)
          this.setState((previousState, previousProps) => {
            return {
              ...previousState,
              disableScrollEvent:false
            };
          })
        } else {
          // RestaurantList was unmounted
          // We need update domRef
          // 1. flush all prev Ref
          this.childGroupDomRef.splice(0)
          // Reset state - This will re-render child and we will
          // get new dom ref
          this.setState((previousState, previousProps) => {
            return {
              ...previousState,
              selected: found.title
            };
          }, () => {
            this.updateSelected(found.title)
          })
        }
      })
    } else {
      window.scrollTo(0,0)
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
