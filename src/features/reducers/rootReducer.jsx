import {createReducer} from "@reduxjs/toolkit";
import {fetchComplete, fetchCurrent, fetchWait} from "../actions/actions";

const initialState = {
    waiting: [],
    current: [],
    complete: []
}
export default createReducer(initialState, (builder => {
    builder.addCase(fetchWait, (state, action) => {
        state.waiting.push(action.payload)
    })
    builder.addCase(fetchCurrent, (state, action) => {
        state.current.push(action.payload)
    })
    builder.addCase(fetchComplete, (state, action) => {
        state.complete.push(action.payload)
    })
}))
