import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fetchItems } from './actions'

const mockStore = configureMockStore([thunk])

describe('Data Fetch Actions', () => {
    let store

    beforeEach(() => {
        store = mockStore({
            items: {}
        })
    })

    describe('fetch Data action creator', () => {
        it('dispatches REQUEST_DATA action and calls correct api using fetch', () => {
            const mockSuccessResponse = []
            const mockJsonPromise = Promise.resolve(mockSuccessResponse) // 2
            const mockFetchPromise = Promise.resolve({ // 3
                json: () => mockJsonPromise,
            })
            jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise) // 4

            store.dispatch(fetchItems())

            expect(global.fetch).toHaveBeenCalledTimes(1)
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:3030/data/best')

            const actions = store.getActions()
            expect(actions[0].type).toEqual('REQUEST_DATA')
        })
    })
})