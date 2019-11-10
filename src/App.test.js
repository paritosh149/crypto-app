import React from 'react'
import { App } from './App'
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import { createMount } from '@material-ui/core/test-utils'
import Button from '@material-ui/core/Button'
import ProfitDisplayBox from './components/ProfitDisplayBox'

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

  it('renders the ProfitDisplayBox component correctly', () => {
    props.items = [{ "currency": "BTC", "date": "2018-05-07T00:00:00.000+10:00", "best": { "buy": { "time": "2019-11-10T09:15:00.000+11:00", "price": "34.98" }, "sell": { "time": "2019-11-10T12:30:00.000+11:00", "price": "37.01" }, "profit": 2.03 } }]
    const wrapper = mount(<App {...props} />);

    expect(wrapper.find(ProfitDisplayBox).length).toBe(1);
  });

})