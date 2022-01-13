import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        professionsRequesField: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsReceved, professionsRequesField } =
    actions;

export const loadProfessionsList = () => async (dispatch) => {
    dispatch(professionsRequested);
    try {
        const { content } = await professionService.get();
        dispatch(professionsReceved(content));
    } catch (error) {
        dispatch(professionsRequesField(error.message));
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;
export function getProfession(id, professions) {
    return professions.find((p) => p._id === id);
}
export default professionsReducer;
