import reducers from './reducers'

describe('reducer tests', () => {
  const initialState = {
    isFetching: false,
    items: [],
    isOpen: false
  };

  it('returns initial state correctly', () => {
    const reducer = reducers(undefined, {});

    expect(reducer).toEqual(initialState);
  });

  it('handles REQUEST_DATA action correctly', () => {
    const reducer = reducers(initialState, {
      type: 'REQUEST_DATA'
    });

    expect(reducer.isFetching).toBeTruthy();
  })

  it('handles RECEIVE_DATA action correctly', () => {
    const reducer = reducers(initialState, {
      type: 'RECEIVE_DATA',
      items:[]
    });

    expect(reducer.isFetching).toBeFalsy();
    expect(reducer).toEqual({
      isFetching: false,
      items:[],
      isOpen: false
    })
  })

})