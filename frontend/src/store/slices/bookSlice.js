import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react';
import { toggleAddBookPopUp } from './popUpSlice';
const bookSlice = createSlice({
    name: 'book',
    initialState: {
        loading: false,
        error: null,
        message: null,
        books: [],
    },
    reducers: {
        fetchBooksRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        fetchBooksSuccess: (state, action) => {
            state.loading = false;
            state.books = action.payload;
        },
        fetchBooksFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },

        addBookRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addBookSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        addBookFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        resetBookSlice: (state) => {
            state.loading = false;
            state.error = null;
            state.message = null;
        }
    }
});


export const fetchAllBooks = () => async(dispatch) => {
    dispatch(bookSlice.actions.fetchBooksRequest());
    await axios.get('https://bookhive-aqrr.onrender.com/api/v1/book/all',{withCredentials: true})
        .then((response) => {
            dispatch(bookSlice.actions.fetchBooksSuccess(response.data.books));
        })
        .catch((error) => {
            dispatch(bookSlice.actions.fetchBooksFailure(error.response.data.message));
        });
}


export const addBook= (data) => async(dispatch) => {
    dispatch(bookSlice.actions.addBookRequest());
    await axios.post('https://bookhive-aqrr.onrender.com/api/v1/book/admin/add', data, 
        {
            withCredentials: true, 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            dispatch(bookSlice.actions.addBookSuccess(response.data.message));
            dispatch(toggleAddBookPopUp());
        })
        .catch((error) => {
            dispatch(bookSlice.actions.addBookFailure(error.response.data.message));
        });
}

export const resetBookSlice = () => async(dispatch) => {
    dispatch(bookSlice.actions.resetBookSlice());
}

export default bookSlice.reducer;