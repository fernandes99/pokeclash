import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store"
import { storage } from "../../utils/storage"

import { Button } from "../../components/button"
import { Container } from "../../components/general"
import { Box, Form, Input, Text, Title, ChoiceBox, Choice } from "./styles"
import { resetUserData, setUserData, setUserName, setUserNewPokemon } from "../../store/reducers/user"
import { useEffect, useState } from "react"
import { requests } from "../../utils/requests"
import { capitalize, getRandomIntFromInterval, getRandomValue, pkmRateInPercentage, resetAllStates } from "../../utils/general"

export const WelcomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [ isNameStep, setNameStep ] = useState(true);
    const [ initialPkms, setInitialPkms ] = useState<any>();

    const getInitialPokemons = async () => {
        let pkms:any = [];

        pkms.push(
            await requests.get.pokemon('charmander'),
            await requests.get.pokemon('bulbasaur'),
            await requests.get.pokemon('squirtle')
        );

        setInitialPkms(pkms);
    }

    const handleAuth = (event: any) => {
        event.preventDefault();
        getInitialPokemons();
        setNameStep(false);
    }

    const savePokemon = async (pkm: any) => {
        let pokemon = await requests.get.specie(pkm.id);

        pokemon = {
            ...pkm,
            ...pokemon,
            status: {},
            xp: {}
        };

        let randomMove = getRandomIntFromInterval(0, pokemon.moves.length - 1);

        pokemon.id = getRandomValue();
        pokemon.pokedex_id = pokemon.id;
        pokemon.name = capitalize(pokemon.name);
        pokemon.level = 5;
        pokemon.image = pkm.sprites.front_default;
        pokemon.moves = pokemon.moves.slice(randomMove, randomMove + 4);
        pokemon.status.hp_total = parseInt(pokemon.stats[0].base_stat + ((pokemon.stats[0].base_stat * 0.1) * pokemon.level));
        pokemon.status.hp_current = pokemon.status.hp_total;
        pokemon.status.hp_percentage = 100;
        pokemon.xp.base = pokemon.base_experience;
        pokemon.xp.next_level = pokemon.xp.base * pokemon.level + 1;
        pokemon.xp.current = pokemon.xp.base * pokemon.level;
        pokemon.capture_rate = pkmRateInPercentage(pokemon.capture_rate);

        const userData = {
            id: getRandomValue(),
            name: user.name,
            items: {
                pokeballs: 5,
                potions: 0,
            }
        };

        // TODO: Criar util que deixe complience os dados do pokemon com os mockados em /mocks antes de atualizar o estado, remover isso de la;
        dispatch(setUserNewPokemon(pokemon));
        dispatch(setUserData(userData));
        navigate('/');
    }

    useEffect(() => {
        storage.clear();
        resetAllStates(dispatch);
    }, []);

    useEffect(() => {
        if (user.pokemons?.length) storage.set('user', user);
    }, [user])

    const ChoicePokemon = () => {
        return (
            <>
                <Text>Selecione seu pokemon inicial:</Text>
                <ChoiceBox>
                    {initialPkms?.map((pkm: any) => {
                        return (
                            <Choice key={pkm.id} onClick={() => savePokemon(pkm)}>
                                <img src={pkm.sprites.front_default} />
                                <span>{pkm.name}</span>
                            </Choice>
                        )
                    })}
                </ChoiceBox>
            </>
        )
    }

    return (
        <Container>
            <Box>
                { isNameStep ?
                    <Form onSubmit={(event: any) => handleAuth(event)}>
                        <Text>Bem vindo ao</Text>
                        <Title>Poke<strong>Clash</strong></Title>
                        <Input placeholder="Insira seu nome" onChange={(e) => dispatch(setUserName(e.target.value))} />
                        <Button.Primary text='Jogar' />
                    </Form>
                    :
                    <ChoicePokemon />
                }
            </Box>
        </Container>
    )
}