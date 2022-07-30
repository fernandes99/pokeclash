import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setCaptureRatePokemonEnemy } from "../../store/reducers/pokemonEnemy";
import { actions } from "../../utils/actions";
import { colors } from "../../utils/colors";
import { Box, LifeBar, Image, Block, Text, Small, List, Item, AttackBlock, DamageIndicator } from "./styles"

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
                <Image color={colors.pokemons[pokemon.color]} src={pokemon.image} />
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
                            <List disabled={global.blockActions}>
                                {pokemon.moves?.map((move: any, index: number) => (
                                    <Item color={move.type.color} type={move.type.name} key={index} onClick={() => actions.attack('enemy', dispatch, enemy, allied, user, move)}>
                                        <span>{move.name}</span>
                                        <DamageIndicator damage={move.power}/>
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