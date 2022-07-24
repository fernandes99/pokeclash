import { UserStateType } from "../store/types"

export const mocks = {
    pokemon: {
        id: 0,
        name: '',
        level: 1,
        image: '',
        color: '',
        moves: [],
        types: [],
        status: {
            hp_total: 0,
            hp_current: 0,
        },
        xp: 0,
        nextXpLevel: 0,
    } as any, // TODO Type

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