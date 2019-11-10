export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'

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

function fetchData() {
    return dispatch => {
        dispatch(requestData())
        return fetch('http://localhost:3030/data/best')
            .then(response => response.json())
            .then(json => dispatch(receiveData(json)))
    }
}

export function fetchItems(){
    return (dispatch, getState) => {
        return dispatch(fetchData())
    }
}