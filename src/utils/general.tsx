import { resetBattleLog } from "../store/reducers/battleLogs";
import { setExplore } from "../store/reducers/global";
import { resetPokemonAllied } from "../store/reducers/pokemonAllied";
import { resetUserData } from "../store/reducers/user";

export const isJsonString = (value: string) => {
    try {
        JSON.parse(value);
    } catch (e) {
        return false;
    }
    return true;
}

export const getRandomValue = () => {
    const array = new Uint32Array(1);
    return window.crypto.getRandomValues(array)[0];
}

export const getRandomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const capitalize = (value: string, lower = false) => {
  return (lower ? value.toLowerCase() : value).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())
}

export const getPercentage = (current: number, total: number) => {
    const result = parseFloat(Math.round((current / total) * 100).toFixed(2));
    return result;
}

export const pkmRateInPercentage = (rate: number) => {
	return parseFloat(((100 * rate) / 255).toFixed(2));
}

export const resetAllStates = (dispatch: any) => {
    dispatch(resetBattleLog(true));
    dispatch(resetPokemonAllied(true));
    dispatch(resetUserData(true));
    dispatch(setExplore(false));
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(() => resolve(true), ms));