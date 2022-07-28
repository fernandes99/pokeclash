import { configs } from "./configs";

export const requests = {
    get: {
        pokemon: async (name?: string, id?: number) => {
            const value = name || id;
            const limit = 800;

            if (value) {
                return await fetch(`${configs.urls.pokeApi}/pokemon/${value}`, { mode: 'cors' })
                    .then(res => res.json());
            }

            const pkmRandom = await fetch(`${configs.urls.pokeApi}/pokemon?limit=${limit}&offset=0`, { mode: 'cors' })
                .then(res => res.json()
                .then(async data => {
                    const pkmIdxRandom = (Math.floor(Math.random() * limit) + 1) - 1;
                    const pkmName = data.results[pkmIdxRandom].name;

                    return await fetch(`${configs.urls.pokeApi}/pokemon/${pkmName}`, { mode: 'cors' }).then(res => res.json());
                }));

            return pkmRandom;
        },

        specie: async (id: number) => {
            return await fetch(`${configs.urls.pokeApi}/pokemon-species/${id}`, { mode: 'cors' })
                .then(res => res.json());
        },

        move: async (name: string) => {
            return await fetch(`${configs.urls.pokeApi}/move/${name}`, { mode: 'cors' })
                .then(res => res.json());
        },

        type: async (name: string) => {
            return await fetch(`${configs.urls.pokeApi}/type/${name}`, { mode: 'cors' })
                .then(res => res.json());
        },

        evolution: async (url: string) => {
            if (!url) return null;

            return await fetch(url, { mode: 'cors' })
                .then(res => res.json());
        },
    },
}