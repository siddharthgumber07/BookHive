import { createSlice } from "@reduxjs/toolkit";
import axios, { all } from "axios";

const borrowSlice = createSlice({
    name: "borrow",
    initialState: {
        loading: false,
        error: null,
        message: null,
        userBorrowedBooks: [],
        allBorrowedBooks: [],
    },

    reducers: {
        fetchUserBorrowedBooksRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        fetchUserBorrowedBooksSuccess: (state, action) => {
            state.loading = false;
            state.userBorrowedBooks = action.payload;
        },
        fetchUserBorrowedBooksFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        recordBookRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        recordBookSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        recordBookFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },


        fetchAllBorrowedBooksRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        fetchAllBorrowedBooksSuccess: (state, action) => {
            state.loading = false;
            state.allBorrowedBooks = action.payload;
        },
        fetchAllBorrowedBooksFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },



        returnBookRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        returnBookSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        returnBookFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },



        resetBorrowSlice: (state) => {
            state.loading = false;
            state.error = null;
            state.message = null;
        },
    },
})


export const fetchUserBorrowedBooks = () => async (dispatch) => {
    dispatch(borrowSlice.actions.fetchUserBorrowedBooksRequest());
    await axios.get('http://localhost:4000/api/v1/borrow/borrowed-books-by-users', { withCredentials: true })
        .then((response) => {
            dispatch(borrowSlice.actions.fetchUserBorrowedBooksSuccess(response.data.borrowedBooks));
        })
        .catch((error) => {
            dispatch(borrowSlice.actions.fetchUserBorrowedBooksFailure(error.response.data.message));
        });
}


export const fetchAllBorrowedBooks = () => async (dispatch) => {
    dispatch(borrowSlice.actions.fetchAllBorrowedBooksRequest());
    await axios.get('http://localhost:4000/api/v1/borrow/all-borrowed-books', { withCredentials: true })
        .then((response) => {
            dispatch(borrowSlice.actions.fetchAllBorrowedBooksSuccess(response.data.borrowedBooks));
        })
        .catch((error) => {
            dispatch(borrowSlice.actions.fetchAllBorrowedBooksFailure(error.response.data.message));
        });
}

export const recordBook = (email, id) => async (dispatch) => {
    dispatch(borrowSlice.actions.recordBookRequest());
    await axios.post(`http://localhost:4000/api/v1/borrow/record-borrow-book/${id}`, { email }, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        dispatch(borrowSlice.actions.recordBookSuccess(response.data.message));
        fetchAllBorrowedBooks();
    })
    .catch((error) => {
        dispatch(borrowSlice.actions.recordBookFailure(error.response.data.message));
    });
}



export const returnBook = (email,id) => async (dispatch) => {
    dispatch(borrowSlice.actions.returnBookRequest());
    await axios.put(`http://localhost:4000/api/v1/borrow/return-borrowed-book/${id}`, {email}, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        dispatch(borrowSlice.actions.returnBookSuccess(response.data.message));
        fetchAllBorrowedBooks();
    })
    .catch((error) => {
        dispatch(borrowSlice.actions.returnBookFailure(error.response.data.message));
    });
}


export const resetBorrowSlice = () => async (dispatch) => {
    dispatch(borrowSlice.actions.resetBorrowSlice());
}


export default borrowSlice.reducer;


