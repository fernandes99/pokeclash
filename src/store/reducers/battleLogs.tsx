import { createSlice } from "@reduxjs/toolkit";

const battleLogs = createSlice({
    name: 'battleLogs',
    initialState: {
        logs: [] as Array<string>, 
    },
    reducers: {
        setBattleLog (state: any, action: any) {
            state.logs.push(action.payload);
        }
    }
})

export const { setBattleLog } = battleLogs.actions;
export default battleLogs.reducer;