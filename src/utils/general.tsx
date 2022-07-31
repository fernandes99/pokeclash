import { resetBattleLog } from "../store/reducers/battleLogs";
import { setExplore } from "../store/reducers/global";
import { resetPokemonAllied } from "../store/reducers/pokemonAllied";
import { resetUserData } from "../store/reducers/user";
import { colors } from "./colors";
import { pokemonsBase } from "./pokemonsBase";
import { requests } from "./requests";
import { typeInBR } from "./translate";

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
    return result == Infinity ? 100 : result;
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

export const getPokemon = async (name?: string, level?: number, customId?: number) => {
    const filter = pokemonsBase.filter((item: any) => (item.pokedex_id >= 649 && item.capture_rate >= 100));
    const random = getRandomIntFromInterval(0, filter.length);

    let base = await requests.get.pokemon(name ? name : '', filter[random].pokedex_id);
    let pokemon = await requests.get.specie(base.id);
    let evolution = await requests.get.evolution(pokemon.evolution_chain?.url);

    pokemon = {
        ...base,
        ...pokemon,
        status: {},
        xp: {},
        evolution: {}
    };

    pokemon.id = customId ? customId : getRandomValue();
    pokemon.pokedex_id = base.id;
    pokemon.name = capitalize(pokemon.name);
    pokemon.level = level ? level : getRandomIntFromInterval(1, 10);
    pokemon.image = base.sprites.front_default;
    pokemon.status.hp_total = parseInt(pokemon.stats[0].base_stat + ((pokemon.stats[0].base_stat * 0.1) * pokemon.level / 2));
    pokemon.status.hp_current = pokemon.status.hp_total;
    pokemon.status.hp_percentage = 100;
    pokemon.xp.base = pokemon.base_experience;
    pokemon.xp.next_level = pokemon.xp.base * (pokemon.level + 1);
    pokemon.xp.current = getRandomIntFromInterval(pokemon.xp.base * pokemon.level, pokemon.xp.next_level);
    pokemon.capture_rate = pkmRateInPercentage(pokemon.capture_rate) / 4;
    pokemon.color = pokemon.color.name;
    pokemon.all_moves = pokemon.moves;

    const filterMoves = pokemon.moves.filter((move: any) => {
        const complienceLevel = move.version_group_details[0].level_learned_at <= pokemon.level;
        const complienceMethod = move.version_group_details[0].move_learn_method.name == 'level-up';

        return complienceMethod && complienceLevel;
    });
    let randomMove = getRandomIntFromInterval(0, filterMoves.length - 4);
    pokemon.moves = filterMoves.slice(randomMove, randomMove + 4);
    pokemon.moves = await Promise.all(pokemon.moves.map(async (item: any) => {
        const data = requests.get.move(item.move.name).then(async res => {
            const type = await requests.get.type(res.type.name);
            const power = res.power ? res.power : 10;
            const accuracy = res.accuracy ? res.accuracy : 100;

            type.color = colors.type[type.name];
            type.name = typeInBR[type.name];

            return {
                name: res.name,
                type: type,
                power: power,
                accuracy: accuracy,
                effects: res.effect_entries
            };
        });
        return data;
    }));
    
    if (evolution?.chain) {
        await new Promise(resolve => {
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

    console.log(pokemon.name, pokemon);
    return pokemon;
}

export const playSoundPkm = (id: number) => {
    const sound = new Audio(`https://pokemoncries.com/cries/${id}.mp3`);

    sound.volume = 0.2;
    sound.play();
}