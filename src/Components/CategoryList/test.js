import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CategoryList from '../CategoryList/index.js'
// import CategoryItem from '../CategoryItem/index.js'

// jest.mock('../CategoryItem', () => { return 'category-item' })

describe('<CategoryList /> spec', () => {
    let categories = [
        {
           "category": "popular brands",
           "count": 10
        },
        {
           "category": "offers near you",
           "count": 16
        },
        {
           "category": "Express delivery",
           "count": 13
        },
        {
           "category": "Gourmet",
           "count": 17
        },
        {
           "category": "Only on Swiggy",
           "count": 20
        },
        {
           "category": "See All",
           "count": 56
        }
     ]
    
    it('renders the component', () => {
        let selected = "popular brands"
        let container = render(<CategoryList categories={categories}  selected={selected}></CategoryList>)
        expect(container.firstChild).toMatchSnapshot()
    })

    it('renders the list', () => {
        let selected = "popular brands"
        render(<CategoryList categories={categories}  selected={selected}></CategoryList>)

        expect(document.querySelector('.category-list').innerHTML).toBe('<li class="active"><div class="title">popular brands</div><div class="desc">10 Options</div></li><li class="item"><div class="title">offers near you</div><div class="desc">16 Options</div></li><li class="item"><div class="title">Express delivery</div><div class="desc">13 Options</div></li><li class="item"><div class="title">Gourmet</div><div class="desc">17 Options</div></li><li class="item"><div class="title">Only on Swiggy</div><div class="desc">20 Options</div></li><li class="item"><div class="title">See All</div><div class="desc">56 Options</div></li>')
    })

    it('renders the active item', () => {
        let selected = "popular brands"
        render(<CategoryList categories={categories}  selected={selected}></CategoryList>)

        expect(document.querySelector('.active').innerHTML).toBe('<div class="title">popular brands</div><div class="desc">10 Options</div>')
    })
})
