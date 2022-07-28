import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setCaptureRatePokemonEnemy } from "../../store/reducers/pokemonEnemy";
import { actions } from "../../utils/actions";
import { colors } from "../../utils/colors";
import { Box, LifeBar, Image, Block, Text, Small, List, Item, AttackBlock } from "./styles"

export const Pokemon = (props: any) => {
    const dispatch = useDispatch();
    const enemy = useSelector((state: RootState) => state.pokemonEnemy);
    const allied = useSelector((state: RootState) => state.pokemonAllied);
    const user = useSelector((state: RootState) => state.user);
    const global = useSelector((state: RootState) => state.global);
    const [pokemon, setPokemon] = useState(props.data);

    const updateRate = () => {
        if (enemy.status?.hp_percentage <= 5) return dispatch(setCaptureRatePokemonEnemy(enemy.capture_rate * 2));
        if (enemy.status?.hp_percentage <= 20) return dispatch(setCaptureRatePokemonEnemy(enemy.capture_rate * 1.5));
        if (enemy.status?.hp_percentage <= 50) return dispatch(setCaptureRatePokemonEnemy(enemy.capture_rate * 1.2));
        if (enemy.status?.hp_percentage <= 90) return dispatch(setCaptureRatePokemonEnemy(enemy.capture_rate * 1.05));
    }

    useEffect(() => {
        setPokemon(props.data);
    }, [props.data]);

    useEffect(() => {
        updateRate();
    }, [enemy.status.hp_percentage]);

    return (
        <>
            <Box>
                <Image color={colors.pokemons[pokemon.color.name]} src={pokemon.image} />
                <Block>
                    <Text>
                        {pokemon.name}
                        <Small>
                            Lv. {pokemon.level}
                        </Small>
                    </Text>

                    <LifeBar
                        full={pokemon.status?.hp_total}
                        current={pokemon.status?.hp_current}
                        percentage={pokemon.status?.hp_percentage}
                    />

                    {!props.isSmall &&
                        <AttackBlock>
                            <Text>Ataques:</Text>
                            <List disabled={global.atacking}>
                                {pokemon.moves?.map((item: any, index: number) => (
                                    <Item key={index} onClick={() => actions.attack('enemy', dispatch, enemy, allied, user, item.move)}>
                                        <span>{item.move.name}</span>
                                    </Item>
                                ))}
                            </List>
                        </AttackBlock>
                    }
                </Block>
            </Box>
        </>
    )
}