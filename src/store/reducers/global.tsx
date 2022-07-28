import { createSlice } from "@reduxjs/toolkit";

const global = createSlice({
    name: 'global',
    initialState: {
        loading: true as boolean,
        explore: false as boolean,
        atacking: false as boolean,
        battleWin: false as boolean,
        battleLose: false as boolean,
    },
    reducers: {
        setLoading (state: any, action: any) {
            state.loading = action.payload;
        },
        setExplore (state: any, action: any) {
            state.explore = action.payload;
        },
        blockActions (state: any, action: any) {
            state.atacking = action.payload;
        },
        setBattleWin (state: any, action: any) {
            state.battleWin = action.payload;
        },
        setBattleLose (state: any, action: any) {
            state.battleLose = action.payload;
        }
    }
})

export const { setLoading, setExplore, blockActions, setBattleWin, setBattleLose } = global.actions;
export default global.reducer;