import { createSlice } from "@reduxjs/toolkit";
import { mocks } from "../../utils/mocks";
import { PokemonType, UserStateType } from "../types";

const user = createSlice({
    name: 'user',
    initialState: mocks.user as UserStateType,
    reducers: { 
        setUserData (state: UserStateType, action: any) {
            const commons: any = {};
            for (let actKey in action.payload) {
                for (let staKey in mocks.user) {
                    if (actKey === staKey) commons[actKey] = action.payload[actKey];
                }
            }

            Object.assign(state, commons);
        },
        setUserName (state: UserStateType, action: any) {
            state.name = action.payload;
        },
        setUserNewPokemon (state: UserStateType, action: any) {
            const commons: any = {};
            for (let actKey in action.payload) {
                for (let staKey in mocks.pokemon) {
                    if (actKey === staKey) commons[actKey] = action.payload[actKey];
                }
            }
            state.pokemons?.push(commons);
        },
        updateUserPokemon (state: UserStateType, action: any) {
            if (state.pokemons) {
                const index = state.pokemons?.findIndex((item: PokemonType) => action.payload.id == item.id);
                state.pokemons[index] = action.payload;
            }
        },
        setUserMoney (state: UserStateType, action: any) {
            state.money = Math.max(0, state.money + action.payload);
        },
        resetUserData (state: UserStateType, action: any) {
            Object.assign(state, mocks.user);
        }
    }
})

export const { setUserData, setUserName, setUserNewPokemon, resetUserData, setUserMoney, updateUserPokemon } = user.actions;
export default user.reducer;