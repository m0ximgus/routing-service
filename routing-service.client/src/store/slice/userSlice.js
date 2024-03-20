import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dateOfBirth: '',
    fullName: '',
    mail: '',
    routes: [],
    id: 0,
    login: '',
    password: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.dateOfBirth = action.payload.dateOfBirth
            state.fullName = action.payload.fullName
            state.mail = action.payload.mail
            state.routes = action.payload.routes
            state.id = action.payload.userId
            state.login = action.payload.login
            state.password = action.payload.password
        },
        setDateOfBirth: (state, action) => {
            state.dateOfBirth = action.payload.dateOfBirth
        },
        setFullName: (state, action) => {
            state.fullName = action.payload.fullName
        },
        setMail: (state, action) => {
            state.mail = action.payload.mail
        },
        setLogin: (state, action) => {
            state.login = action.payload.login
        },
        setPassword: (state, action) => {
            state.password = action.payload.password
        }
    }
});

export const { setUser, setDateOfBirth, setFullName, setMail, setLogin, setPassword } = userSlice.actions;
export default userSlice.reducer;