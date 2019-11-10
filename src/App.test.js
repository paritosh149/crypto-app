import React from 'react'
import { App } from './App'
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import { createMount } from '@material-ui/core/test-utils'
import Button from '@material-ui/core/Button'

describe('App Component', () => {
    let props
    let mount

    beforeAll(() => {
        mount = createMount()
        props = {
            items: [],
            isFetching: false
        }
    })

    it('renders without crashing', () => {
        const tree = renderer.create(<App {...props} />)

        expect(tree.toJSON()).toMatchSnapshot()
    })

    it('calls the fetchData function when the button is clicked', () => {
        props.fetchItems = jest.fn()
        const wrapper = mount(<App {...props} />)
        const spy = jest.spyOn(wrapper.instance().props, 'fetchItems')

        wrapper.find(Button).simulate('click')
        expect(spy).toHaveBeenCalled()
    })

})