import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store"
import { storage } from "../../utils/storage"

import { Button } from "../../components/button"
import { Container } from "../../components/general"
import { Box, Form, Input, Text, Title, ChoiceBox, Choice } from "./styles"
import { setUserData, setUserName, setUserNewPokemon } from "../../store/reducers/user"
import { useEffect, useState } from "react"
import { getPokemon, getRandomValue, resetAllStates, sleep } from "../../utils/general"
import { setLoading } from "../../store/reducers/global"

export const WelcomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [ isNameStep, setNameStep ] = useState(true);
    const [ initialPkms, setInitialPkms ] = useState<any>();

    const getInitialPokemons = async () => {
        let pokemons:any = [];

        pokemons.push(
            await getPokemon({ name: 'charmander', level: 5, customMoveLevel: 16 }),
            await getPokemon({ name: 'bulbasaur', level: 5, customMoveLevel: 16 }),
            await getPokemon({ name: 'squirtle', level: 5, customMoveLevel: 16 }),
        );

        setInitialPkms(pokemons);
    }

    const handleAuth = (event: any) => {
        event.preventDefault();
        getInitialPokemons();
        setNameStep(false);
    }

    const savePokemon = async (pokemon: any) => {
        const userData = {
            id: getRandomValue(),
            name: user.name,
            items: {
                pokeballs: 5,
                potions: 0,
            }
        };

        dispatch(setUserNewPokemon(pokemon));
        dispatch(setUserData(userData));
        dispatch(setLoading(true));

        await sleep(1000);

        dispatch(setLoading(false));
        navigate('/');
    }

    useEffect(() => {
        storage.clear();
        resetAllStates(dispatch);
    }, []);

    useEffect(() => {
        if (user.pokemons?.length) storage.set('user', user)
    }, [user]);

    const ChoicePokemon = () => {
        return (
            <>
                <Text>Selecione seu pokemon inicial:</Text>
                <ChoiceBox>
                    {initialPkms?.map((pkm: any) => {
                        return (
                            <Choice key={pkm.id} onClick={() => savePokemon(pkm)}>
                                <img src={pkm.image} />
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