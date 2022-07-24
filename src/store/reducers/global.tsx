import { createSlice } from "@reduxjs/toolkit";

const global = createSlice({
    name: 'global',
    initialState: {
        loading: true as boolean,
        explore: false as boolean
    },
    reducers: {
        setLoading (state: any, action: any) {
            state.loading = action.payload;
        },
        setExplore (state: any, action: any) {
            state.explore = action.payload;
        },
    }
})

export const { setLoading, setExplore } = global.actions;
export default global.reducer;