import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import { BattleLogs } from "../../components/battleLogs";
import { Container, Spinner } from "../../components/general"
import { Items } from "../../components/items";
import { MyPokemons } from "../../components/myPokemons";
import { Pokemon } from "../../components/pokemon"
import { Statistics } from "../../components/statistics";;
import { ExploreBlock, SelectPokemonToBattle } from "./components/general";
import { Header } from "./components/header";

// Store
import { RootState } from "../../store";
import { resetBattleLog } from "../../store/reducers/battleLogs";
import { blockActions, setBattleLose, setBattleWin, setExplore, setLevelUped, setTurn } from "../../store/reducers/global";
import { resetPokemonAllied } from "../../store/reducers/pokemonAllied";
import { resetPokemonEnemy, setPokemonEnemy } from "../../store/reducers/pokemonEnemy";
import { setUserData, updateUserPokemon } from "../../store/reducers/user";

// Utils
import { getPokemon, getRandomIntFromInterval, playSoundPkm } from "../../utils/general";
import { storage } from "../../utils/storage";

// Style
import { Box, Content, Block } from "./styles"
import { actions } from "../../utils/actions";

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
        dispatch(blockActions(false));
        playSoundPkm(pokemon.pokedex_id);
    }

    const resetAllBattleStates = () => {
        dispatch(resetPokemonAllied(true));
        dispatch(resetPokemonEnemy(true));
        dispatch(resetBattleLog(true));
        dispatch(setExplore(false));
        dispatch(setBattleWin(false));
        dispatch(setBattleLose(false));
        dispatch(setLevelUped(false));
    }

    useEffect(() => {
        auth();
        dispatch(blockActions(true));
    }, [])

    useEffect(() => {
        storage.set('user', user);
    }, [user]);

    useEffect(() => {
        if (global.turn === 'enemy') {
            dispatch(setTurn('allied'));
            actions.attack('allied', dispatch, enemy, allied, user, enemy.moves[getRandomIntFromInterval(0, enemy.moves.length - 1)]);
        }
    }, [global.turn])

    useEffect(() => {
        if (global.explore) setEnemy();
    }, [global.explore]);

    useEffect(() => {
        if (global.battleWin || global.battleLose) {
            let pokemon = allied;

            const handleStatePokemon = new Promise(async resolve => {
                if (global.levelUped) {
                    alert('Parabéns seu pokemon subiu de nivel!');

                    if (allied.level >= allied.evolution.min_level) {
                        alert('Parabéns seu pokemon evoluiu!');
                        pokemon = await getPokemon(allied.evolution.to.name, allied.level, allied.id);
                    }
                }

                resolve(pokemon);
            });

            handleStatePokemon.then((res: any) => {
                dispatch(updateUserPokemon(res));
                resetAllBattleStates();
            });
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
                                {enemy?.id ? <Pokemon data={enemy} isSmall={true} /> : <Spinner align={'center'} size={32}/>}
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