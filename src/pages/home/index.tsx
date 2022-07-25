import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BattleLogs } from "../../components/battleLogs";
import { Container } from "../../components/general"
import { Items } from "../../components/items";
import { MyPokemons } from "../../components/myPokemons";
import { Pokemon } from "../../components/pokemon"
import { Statistics } from "../../components/statistics";;
import { RootState } from "../../store";
import { resetBattleLog } from "../../store/reducers/battleLogs";
import { resetPokemonAllied } from "../../store/reducers/pokemonAllied";
import { resetPokemonEnemy, setPokemonEnemy } from "../../store/reducers/pokemonEnemy";
import { setUserData } from "../../store/reducers/user";
import { capitalize, getRandomIntFromInterval, pkmRateInPercentage } from "../../utils/general";
import { requests } from "../../utils/requests";
import { storage } from "../../utils/storage";
import { ExploreBlock, SelectPokemonToBattle } from "./components/general";
import { Header } from "./components/header";
import { Box, Content, Block } from "./styles"

export const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const enemy = useSelector((state: RootState) => state.pokemonEnemy);
    const allied = useSelector((state: RootState) => state.pokemonAllied);
    const battleLogs = useSelector((state: RootState) => state.battleLogs);
    const global = useSelector((state: RootState) => state.global);

    const auth = () => {
        const user = storage.get('user');
    
        if (user) dispatch(setUserData(user));
        else navigate('/bemvindo');
    }

    const setEnemy = async () => {
        let base = await requests.get.pokemon();
        let pokemon = await requests.get.specie(base.id);

        pokemon = {
            ...base,
            ...pokemon,
            status: {},
        };

        let randomMove = getRandomIntFromInterval(0, pokemon.moves.length - 1);

        pokemon.name = capitalize(pokemon.name);
        pokemon.level = getRandomIntFromInterval(1, 10);
        pokemon.image = base.sprites.front_default;
        pokemon.moves = pokemon.moves.slice(randomMove, randomMove + 4);
        pokemon.status.hp_total = parseInt(pokemon.stats[0].base_stat + ((pokemon.stats[0].base_stat * 0.1) * pokemon.level));
        pokemon.status.hp_current = pokemon.status.hp_total;
        pokemon.status.hp_percentage = 100;
        pokemon.xp = {}
        pokemon.xp.base = pokemon.base_experience;
        pokemon.xp.next_level = pokemon.xp.base * pokemon.level;
        pokemon.xp.current = getRandomIntFromInterval(0, pokemon.base_experience);
        pokemon.capture_rate = pkmRateInPercentage(pokemon.capture_rate) / 4;

        dispatch(setPokemonEnemy(pokemon));
        dispatch(resetBattleLog(true));
    }

    const resetAllBattleStates = () => {
        dispatch(resetPokemonAllied(true));
        dispatch(resetPokemonEnemy(true));
    }

    useEffect(() => {
        auth();
    }, [])

    useEffect(() => {
        storage.set('user', user);
    }, [user]);

    useEffect(() => {
        if (!global.explore) resetAllBattleStates();
        else setEnemy();


    }, [global.explore])

    return (
        <>
            <Header />
            <Container>
                <Content>
                    <Box title="Arena de Batalha" id='battle'>
                        {global.explore
                            ? <Block>
                                {allied?.id ? <Pokemon data={allied} /> : <SelectPokemonToBattle />}
                                {enemy?.id && <Pokemon data={enemy} isSmall={true}/>}
                            </Block>
                            : <ExploreBlock />
                        }
                    </Box>

                    <Box title="Estatísticas" id='statistics'>
                        {user && <Statistics data={user} /> }
                    </Box>

                    <Box title="Itens" id='items'>
                        {user && <Items data={user.items} /> }
                    </Box>

                    <Box title="Pokemons" id='pokemons'>
                        {user && <MyPokemons data={user.pokemons} /> }
                    </Box>

                    <Box title="Informações da Batalha" id='logs'>
                        <BattleLogs logs={battleLogs.logs} />
                    </Box>
                </Content>
            </Container>
        </>
    )
}