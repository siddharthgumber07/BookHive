import {createSlice } from '@reduxjs/toolkit';
const popUpSlice = createSlice({
    name: 'popUp',
    initialState: {
        settingPopUp: false,
        addBookPopUp: false,
        readBookPopUp: false,
        recordBookPopUp: false,
        returnBookPopUp: false,
        addNewAdminPopUp: false,
    },
    reducers: {
        toggleSettingPopUp: (state) => {
            state.settingPopUp = !state.settingPopUp;
        },
        toggleAddBookPopUp: (state) => {
            state.addBookPopUp = !state.addBookPopUp;
        },
        toggleReadBookPopUp: (state) => {
            state.readBookPopUp = !state.readBookPopUp;
        },
        toggleRecordBookPopUp: (state) => {
            state.recordBookPopUp = !state.recordBookPopUp;
        },
        toggleReturnBookPopUp: (state) => {
            state.returnBookPopUp = !state.returnBookPopUp;
        },
        toggleAddNewAdminPopUp: (state) => {
            state.addNewAdminPopUp = !state.addNewAdminPopUp;
        },

        closeAllPopUp(state) {
            state.addBookPopUp = false;
            state.addNewAdminPopUp = false;
            state.readBookPopUp = false;
            state.recordBookPopUp = false;
            state.returnBookPopUp = false;
            state.settingPopUp = false;
        }
    },
});

export const { closeAllPopUp, toggleAddBookPopUp, toggleAddNewAdminPopUp, toggleReadBookPopUp, toggleRecordBookPopUp, toggleReturnBookPopUp, toggleSettingPopUp } = popUpSlice.actions;

export default popUpSlice.reducer;