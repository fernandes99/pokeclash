import { createSlice } from "@reduxjs/toolkit";
import { getPercentage } from "../../utils/general";
import { mocks } from "../../utils/mocks";

const pokemonAllied = createSlice({
    name: 'pokemonAllied',
    initialState: mocks.pokemon,
    reducers: { 
        setPokemonAllied (state, action) {
            const commons: any = {};
            for (let actKey in action.payload) {
                for (let staKey in mocks.pokemon) {
                    if (actKey === staKey) commons[actKey] = action.payload[actKey];
                }
            }

            Object.assign(state, commons);
        },

        updatePokemonAllied (state, action) {
            Object.assign(state, action.payload)
        },

        addXpPokemonAllied (state, action) {
            const newCurrent = state.xp.current + action.payload;

            state.xp.current = newCurrent;

            while (newCurrent >= state.xp.next_level) {
                state.xp.next_level = state.xp.base * (state.level + 2);
                state.level = state.level + 1;
            }
        },

        setCurrentHpPokemonAllied (state, action) {
            state.status.hp_current = action.payload;
            state.status.hp_percentage = getPercentage(action.payload, state.status.hp_total);
        },

        resetPokemonAllied (state, action) {
            Object.assign(state, mocks.pokemon);
        }
    }
})

export const { setPokemonAllied, updatePokemonAllied, setCurrentHpPokemonAllied, addXpPokemonAllied, resetPokemonAllied } = pokemonAllied.actions;
export default pokemonAllied.reducer;