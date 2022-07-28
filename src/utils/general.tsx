import { resetBattleLog } from "../store/reducers/battleLogs";
import { setExplore } from "../store/reducers/global";
import { resetPokemonAllied } from "../store/reducers/pokemonAllied";
import { resetUserData } from "../store/reducers/user";
import { requests } from "./requests";

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

export const getPokemon = async (name?: string, level?: number) => {
    let base = await requests.get.pokemon(name ? name : '');
    let pokemon = await requests.get.specie(base.id);
    let evolution = await requests.get.evolution(pokemon.evolution_chain?.url);

    pokemon = {
        ...base,
        ...pokemon,
        status: {},
        xp: {},
        evolution: {}
    };

    pokemon.id = getRandomValue();
    pokemon.pokedex_id = pokemon.id;
    pokemon.name = capitalize(pokemon.name);
    pokemon.level = level ? level : getRandomIntFromInterval(1, 10);
    pokemon.image = base.sprites.front_default;
    pokemon.status.hp_total = parseInt(pokemon.stats[0].base_stat + ((pokemon.stats[0].base_stat * 0.1) * pokemon.level / 5));
    pokemon.status.hp_current = pokemon.status.hp_total;
    pokemon.status.hp_percentage = 100;
    pokemon.xp.base = pokemon.base_experience;
    pokemon.xp.next_level = pokemon.xp.base * pokemon.level;
    pokemon.xp.current = getRandomIntFromInterval(0, pokemon.base_experience);
    pokemon.capture_rate = pkmRateInPercentage(pokemon.capture_rate) / 4;

    const filterMoves = pokemon.moves.filter((move: any) => {
        const complienceLevel = move.version_group_details[0].level_learned_at <= pokemon.level;
        const complienceMethod = move.version_group_details[0].move_learn_method.name == 'level-up';

        return complienceMethod && complienceLevel;
    });
    let randomMove = getRandomIntFromInterval(0, filterMoves.length - 4);
    pokemon.moves = filterMoves.slice(randomMove, randomMove + 4);
    
    if (evolution?.chain) {
        await new Promise((resolve, reject) => {
            let current = evolution.chain;

            while (current) {
                if (current.species.name == pokemon.name.toLowerCase()) {
                    const nextEvolve = current.evolves_to?.[0]?.species;
                    const minLevelToEvolve = current.evolves_to?.[0]?.evolution_details?.[0]?.min_level;

                    pokemon.evolution.to = nextEvolve ? nextEvolve : null;
                    pokemon.evolution.min_level = minLevelToEvolve ? minLevelToEvolve : null; 

                    resolve(null);
                    break;
                }

                if (!current.evolves_to?.length) {
                    resolve(null);
                    break;
                }

                current = current.evolves_to[0];
            }
        });
    }

    return pokemon;
}