import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducer from "./reducers/global";
import userReducer from "./reducers/user";
import pokemonEnemyReducer from "./reducers/pokemonEnemy";
import pokemonAlliedReducer from "./reducers/pokemonAllied";
import battleLogsReducer from "./reducers/battleLogs";

const reducer = combineReducers({
    global: globalReducer,
    user: userReducer,
    pokemonEnemy: pokemonEnemyReducer,
    pokemonAllied: pokemonAlliedReducer,
    battleLogs: battleLogsReducer
});

const store = configureStore({
    reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;