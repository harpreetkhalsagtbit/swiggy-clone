import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import RestaurantTile from '../RestaurantTile/index.js'

describe('<RestaurantTile /> spec', () => {
    let restaurant = 			{
        "name": "Hot Spot Mini Shop",
        "food_types": ["Fast Food", "Snacks", "North Indian", "Chinese", "Italian", "Desserts", "Beverages"],
        "ratings": "4.0",
        "isExlusive": true,
        "delivery_time": "108 mins",
        "price_for_two": 1300
    }
    it('renders the component', () => {

        let container = render(<RestaurantTile restaurant={restaurant}/>)
        expect(container.firstChild).toMatchSnapshot()
    })
    it('assert Show More Tiles displays correct data', () => {
        render(<RestaurantTile restaurant={restaurant}/>)
 
        expect(document.querySelector('.restaurant-tile-body-title').innerHTML).toBe("Hot Spot Mini Shop")
        expect(document.querySelector('.restaurant-tile-body-subtitle').innerHTML).toBe("Fast Food, Snacks, North Indian, Chinese, Italian, Desserts, Beverages")
        expect(document.querySelector('.restaurant-tile-body-desc-wrapper').innerHTML).toBe('<div class="restaurant-tile-body-desc-ratings"><span class="star">☆</span><span>4.0</span></div><div>•</div><div>108 mins</div><div>•</div><div class="">₹1300 FOR TWO</div>')
    })
})
