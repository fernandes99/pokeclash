import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import { BattleLogs } from "../../components/battleLogs";
import { Container } from "../../components/general"
import { Items } from "../../components/items";
import { MyPokemons } from "../../components/myPokemons";
import { Pokemon } from "../../components/pokemon"
import { Statistics } from "../../components/statistics";;
import { ExploreBlock, SelectPokemonToBattle } from "./components/general";
import { Header } from "./components/header";

// Store
import { RootState } from "../../store";
import { resetBattleLog } from "../../store/reducers/battleLogs";
import { setBattleLose, setBattleWin } from "../../store/reducers/global";
import { resetPokemonAllied } from "../../store/reducers/pokemonAllied";
import { resetPokemonEnemy, setPokemonEnemy } from "../../store/reducers/pokemonEnemy";
import { setUserData, updateUserPokemon } from "../../store/reducers/user";

// Utils
import { capitalize, getPokemon, getRandomIntFromInterval, getRandomValue, pkmRateInPercentage } from "../../utils/general";
import { requests } from "../../utils/requests";
import { storage } from "../../utils/storage";

// Style
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
        const pokemon = await getPokemon();

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

    }, [user.pokemons]);

    useEffect(() => {
        if (!global.explore) resetAllBattleStates();
        else setEnemy();
    }, [global.explore]);

    useEffect(() => {
        if (global.battleWin || global.battleLose) {
            dispatch(updateUserPokemon(allied));
            dispatch(setBattleWin(false));
            dispatch(setBattleLose(false));
        }
    }, [global.battleWin, global.battleLose]);

    return (
        <>
            <Header />
            <Container>
                <Content>
                    <Box title="Arena de Batalha" id='battle'>
                        {global.explore
                            ? <Block>
                                {allied?.id ? <Pokemon data={allied} /> : <SelectPokemonToBattle />}
                                {enemy?.id ? <Pokemon data={enemy} isSmall={true} /> : 'Procurando Pokemon Selvagem'}
                            </Block>
                            : <ExploreBlock />
                        }
                    </Box>

                    <Box title="Estatísticas" id='statistics'>
                        {user && <Statistics data={user} />}
                    </Box>

                    <Box title="Itens" id='items'>
                        {user && <Items data={user.items} />}
                    </Box>

                    <Box title="Pokemons" id='pokemons'>
                        {user && <MyPokemons data={user.pokemons} />}
                    </Box>

                    <Box title="Informações da Batalha" id='logs'>
                        <BattleLogs logs={battleLogs.logs} />
                    </Box>
                </Content>
            </Container>
        </>
    )
}