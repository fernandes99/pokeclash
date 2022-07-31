import { createSlice } from "@reduxjs/toolkit";

const global = createSlice({
    name: 'global',
    initialState: {
        loading: true as boolean,
        explore: false as boolean,
        blockActions: false as boolean,
        battleWin: false as boolean,
        battleLose: false as boolean,
        turn: '' as 'enemy' | 'allied',
        levelUped: false,
    },
    reducers: {
        setLoading (state: any, action: any) {
            state.loading = action.payload;
        },
        setExplore (state: any, action: any) {
            state.explore = action.payload;
        },
        blockActions (state: any, action: any) {
            state.blockActions = action.payload;
        },
        setBattleWin (state: any, action: any) {
            state.battleWin = action.payload;
        },
        setBattleLose (state: any, action: any) {
            state.battleLose = action.payload;
        },
        setTurn (state: any, action: any) {
            state.turn = action.payload
        },
        setLevelUped (state: any, action: any) {
            state.levelUped = action.payload;
        }
    }
})

export const { setLoading, setExplore, blockActions, setBattleWin, setBattleLose, setTurn, setLevelUped } = global.actions;
export default global.reducer;