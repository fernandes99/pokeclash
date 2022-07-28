import { createSlice } from "@reduxjs/toolkit";
import { getPercentage } from "../../utils/general";
import { mocks } from "../../utils/mocks";

const pokemonEnemy = createSlice({
    name: 'pokemonEnemy',
    initialState: mocks.pokemon,
    reducers: { 
        setPokemonEnemy (state: any, action: any) {
            const commons: any = {};
            for (let actKey in action.payload) {
                for (let staKey in mocks.pokemon) {
                    if (actKey === staKey) commons[actKey] = action.payload[actKey];
                }
            }

            Object.assign(state, commons);
        },

        updatePokemonEnemy (state: any, action: any) {
            Object.assign(state, action.payload)
        },

        setCaptureRatePokemonEnemy (state: any, action: any) {
            state.capture_rate = action.payload;
        },

        setCurrentHpPokemonEnemy (state: any, action: any) {
            state.status.hp_current = Math.max(0, action.payload);
            state.status.hp_percentage = getPercentage(action.payload, state.status.hp_total);
        },

        resetPokemonEnemy (state: any, action: any) {
            Object.assign(state, mocks.pokemon);
        }
    }
})

export const { setPokemonEnemy, updatePokemonEnemy, setCurrentHpPokemonEnemy, setCaptureRatePokemonEnemy, resetPokemonEnemy } = pokemonEnemy.actions;
export default pokemonEnemy.reducer;