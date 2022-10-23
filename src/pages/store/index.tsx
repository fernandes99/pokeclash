import { message } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/button"
import { Container } from "../../components/general"
import { Items } from "../../components/items"
import { RootState } from "../../store"
import { setLoading } from "../../store/reducers/global"
import { setUserData } from "../../store/reducers/user"
import { storage } from "../../utils/storage"
import { Header } from "../home/components/header"
import { Box, Label, Field, Action, Content, Price } from "./styles"

export const StorePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [pokeballs, setPokeballs] = useState(0);
    const [potions, setPotions] = useState(0);
    const [money, setMoney] = useState(0);
    const values = {
        pokeball: 100,
        super_pokeball: 500,
        mega_pokeball: 2000,
        potion: 50
    }

    useEffect(() => {
        const total = pokeballs * values.pokeball + potions * values.potion;
        setMoney(total);
    }, [potions, pokeballs]);

    const buy = () => {
        if (money > user.money) {
            return message.info(`Você não tem R$ ${money}`);
        }

        const userData = {
            money: user.money - money,
            items: {
                pokeballs: pokeballs + user.items.pokeballs,
                potions: potions + user.items.potions
            },
        }

        dispatch(setUserData(userData));
        dispatch(setLoading(true));

        setTimeout(() => {
            dispatch(setLoading(false));
            navigate('/');
        }, 1000);
    }

    useEffect(() => {
        storage.set('user', user);
    }, [user]);

    return (
        <>
            <Header />
            <Container>
                <Content>
                    <Box>
                        <Field>
                            <Label>Pokebola</Label>
                            <Price>R$ {values.pokeball}</Price>
                            <Action>
                                <button onClick={() => setPokeballs(pokeballs - 1)}>-</button>
                                <input type="number" value={pokeballs} onChange={(e: any) => setPokeballs(e.target.value)} />
                                <button onClick={() => setPokeballs(pokeballs + 1)}>+</button>
                            </Action>
                        </Field>

                        <Field>
                            <Label>Super Pokebola</Label>
                            <Price>R$ {values.super_pokeball}</Price>
                            <Action>
                                <button onClick={() => {}}>-</button>
                                <input type="number" defaultValue={0} />
                                <button onClick={() => {}}>+</button>
                            </Action>
                        </Field>

                        <Field>
                            <Label>Mega Pokebola</Label>
                            <Price>R$ {values.mega_pokeball}</Price>
                            <Action>
                                <button onClick={() => {}}>-</button>
                                <input type="number" defaultValue={0} />
                                <button onClick={() => {}}>+</button>
                            </Action>
                        </Field>

                        <Field>
                            <Label>Poção</Label>
                            <Price>R$ {values.potion}</Price>
                            <Action>
                                <button onClick={() => setPotions(potions - 1)}>-</button>
                                <input type="number" value={potions} onChange={(e: any) => setPotions(e.target.value)}/>
                                <button onClick={() => setPotions(potions + 1)}>+</button>
                            </Action>
                        </Field>

                        <Field>
                            <Label>Total</Label>
                            <div></div>
                            <Action>R$ {money}</Action>
                        </Field>

                        <Button.Primary text="Comprar" onClick={() => buy()}/>
                    </Box>

                    <Box>
                        <Items data={user.items} money={user.money} />
                    </Box>
                </Content>
            </Container>
        </>
    )
}