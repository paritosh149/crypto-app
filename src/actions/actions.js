export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const RECEIVE_ERROR = 'RECEIVE_ERROR'
export const CLOSE_ERROR = 'CLOSE_ERROR'

function requestData() {
    return {
        type: REQUEST_DATA
    }
}

function receiveData(json) {
    return {
        type: RECEIVE_DATA,
        items: json
    }
}

function receiveError(error) {
    return {
        type: RECEIVE_ERROR,
        error: error
    }
}

export function closeError() {
    return {
        type: CLOSE_ERROR
    }
}

function fetchData() {
    return dispatch => {
        dispatch(requestData())
        return fetch('http://localhost:3030/data/best')
            .then(response => response.json())
            .then(json => dispatch(receiveData(json)))
            .catch(error => {
                console.error('Fetch failed', error)
                dispatch(receiveError(error))
            })
    }
}

export function fetchItems() {
    return (dispatch, getState) => {
        return dispatch(fetchData())
    }
}
