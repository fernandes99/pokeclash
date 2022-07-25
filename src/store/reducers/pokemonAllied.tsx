import { createSlice } from "@reduxjs/toolkit";
import { getPercentage } from "../../utils/general";
import { mocks } from "../../utils/mocks";

const pokemonAllied = createSlice({
    name: 'pokemonAllied',
    initialState: mocks.pokemon as any,
    reducers: { 
        setPokemonAllied (state: any, action: any) {
            const commons: any = {};
            for (let actKey in action.payload) {
                for (let staKey in mocks.pokemon) {
                    if (actKey === staKey) commons[actKey] = action.payload[actKey];
                }
            }

            Object.assign(state, commons);
        },

        updatePokemonAllied (state: any, action: any) {
            Object.assign(state, action.payload)
        },

        addXpPokemonAllied (state: any, action: any) {
            state.xp.current = state.xp.current + action.payload;
        },

        setCurrentHpPokemonAllied (state: any, action: any) {
            state.status.hp_current = action.payload;
            state.status.hp_percentage = getPercentage(action.payload, state.status.hp_total);
        },

        resetPokemonAllied (state: any, action: any) {
            Object.assign(state, mocks.pokemon);
        }
    }
})

export const { setPokemonAllied, updatePokemonAllied, setCurrentHpPokemonAllied, addXpPokemonAllied, resetPokemonAllied } = pokemonAllied.actions;
export default pokemonAllied.reducer;