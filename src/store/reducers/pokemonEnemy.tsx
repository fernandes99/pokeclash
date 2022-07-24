import { createSlice } from "@reduxjs/toolkit";
import { mocks } from "../../utils/mocks";

const pokemonEnemy = createSlice({
    name: 'pokemonEnemy',
    initialState: mocks.pokemon as any,
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

        setCurrentHpPokemonEnemy (state: any, action: any) {
            state.status.hp_current = action.payload;
        }
    }
})

export const { setPokemonEnemy, updatePokemonEnemy, setCurrentHpPokemonEnemy } = pokemonEnemy.actions;
export default pokemonEnemy.reducer;