import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    routeName: '',
    routeDate: '',
    routeComment: '',
    routeId: 0,
    userId: 0,
    routeMatches: []
};

export const routeSlice = createSlice({
    name: 'route',
    initialState,
    reducers: {
        setRoute: (state, action) => {
            state.routeName = action.payload.routeName
            state.routeDate = action.payload.routeDate
            state.routeComment = action.payload.routeComment
            state.routeId = action.payload.routeId
            state.userId = action.payload.userId
            state.routeMatches = action.payload.routeMatches
        }
    }
});

export const { setRoute } = routeSlice.actions;
export default routeSlice.reducer;