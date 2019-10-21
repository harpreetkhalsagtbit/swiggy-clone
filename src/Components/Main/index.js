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
    this.timer= '';

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
    // Debounce simultaneous event firing
    clearTimeout(this.timer)

    this.timer = setTimeout(() => {
      // Windows scroll event and changing sccroll event on click
      // of category gets clashed, we need to prevent this default scroll
      // event when category is clicked
      if(this.state && !this.state.disableScrollEvent) {
        // get nearest group
        let fallback = '';
        let found = this.childGroupDomRef.find((ref, index) => {
          var top = ref.domRef.current.getBoundingClientRect().top;
          var height = ref.domRef.current.getBoundingClientRect().height;

          // Hack
          // We know that our code works fine when top is in the viewport
          // but faces issue when current section and appearing section's top
          // both are not visible because screen size is small and section size
          // is large, in that case we can highlight earlier section whose
          // bottom is in the viewport
          if(top < 0 && top + height > window.innerHeight) {
            fallback = ref;
          }

          return top + 1 > 0 && top < window.innerHeight
        })

        found = found || fallback
        if(found) {
          this.setState((previousState, previousProps) => {
            return {
              ...previousState,
              selected: found.title,
            };
          });  
        }
      }
    }, 200)

  }

  updateSelected(item) {
    if(item != 'See All') {
      // find out the domRef using category title
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
          // move scroll to current selected category
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
      // move scroll to top
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
