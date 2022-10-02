export type UserStateType = {
    id: number,
    name: string,
    money: number,
    fights: number,
    wins: number,
    losses: number,
    winRate: number,
    items: {
        pokeballs: number,
        potions: number,
    },
    pokemons?: Array<PokemonType>,
    pokedex?: [
        {
            id: number,
            name: string
        }?
    ]
};

export type PokemonType = {
    id: number,
    pokedex_id: number,
    name: string,
    level: number,
    image: string,
    color: string,
    all_moves: Array<any>,
    moves: Array<any>,
    types: Array<any>,
    capture_rate: number,
    xp: {
        base: number,
        current: number,
        next_level: number
    },
    status: {
        hp_total: number,
        hp_current: number,
        hp_percentage: number,
    },
    evolution: {
        min_level: number,
        to: {
            name: string,
            url: string,
        },
    },
}

export type GetPokemonPropsType = {
    name?: string,
    level?: number,
    id?: number,
    customMoveLevel?: number
}