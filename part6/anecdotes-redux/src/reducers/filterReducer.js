const initialState = {
    currentFilter: "NONE",
    payload: {}
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NONE":
            return initialState
        case "SEARCH":
            return {
                currentFilter: "SEARCH",
                payload: {
                    text: action.payload
                },
            }
        default:
            return state
    }
}

export const searchByText = (text) => {
    return {
        type: "SEARCH",
        payload: text
    }
}

export const clearCurrentFilters = () => {
    return {
        type: "NONE",
    }
}


export default filterReducer;