import { PokemonType, UserStateType } from "../store/types"

export const mocks = {
    pokemon: {
        id: 0,
        name: '',
        level: 1,
        image: '',
        color: '',
        moves: [],
        types: [],
        capture_rate: 0,
        xp: {
            base: 0,
            current: 0,
            next_level: 0
        },
        status: {
            hp_total: 0,
            hp_current: 0,
            hp_percentage: 0,
        },
        evolution: {
            to: {
                name: '',
                url: '',
            },
        }
    } as PokemonType,

    user: {
        id: 0,
        name: '',
        money: 0,
        fights: 0,
        wins: 0,
        losses: 0,
        winRate: 0,
        items: {
            pokeballs: 0,
            potions: 0,
        },
        pokemons: [],
        pokedex: []
    } as UserStateType
}