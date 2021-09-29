import {createAction} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWait = createAction("FETCH_WAIT")
export const waitFetch = () => {
    return async (dispatch) => {
        let url = 'http://127.0.0.1:5000/api/waiting'
        try {
            const response = await axios(url)
            let data = await response.data;
            dispatch({type: fetchWait.toString(), payload: data})


        } catch (e) {
            console.log(e)
        }
    }
}
export const fetchCurrent = createAction("FETCH_CURRENT")


export const fetchComplete = createAction("FETCH_COMPLETE")

