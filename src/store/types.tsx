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
        potions: 0,
    },
    pokemons?: [
        {
            id: number,
            name: string,
            level: number,
            image: string,
            moves: Array<any>,
            types: Array<any>,
            status: {
                hp_total: number,
                hp_current: number,
            },
            xp: number,
            nextXpLevel: number
        }?
    ]
    pokedex?: [
        {
            id: number,
            name: string
        }?
    ]
};