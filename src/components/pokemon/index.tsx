import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setBattleLog } from "../../store/reducers/battleLogs";
import { setCurrentHpPokemonAllied } from "../../store/reducers/pokemonAllied";
import { setCurrentHpPokemonEnemy } from "../../store/reducers/pokemonEnemy";
import { colors } from "../../utils/colors";
import { getPercentage, getRandomIntFromInterval } from "../../utils/general";
import { requests } from "../../utils/requests";
import { Box, LifeBar, Image, Block, Text, Small, List, Item, AttackBlock } from "./styles"

export const Pokemon = (props: any) => {
    const dispatch = useDispatch();
    const enemy = useSelector((state: RootState) => state.pokemonEnemy);
    const allied = useSelector((state: RootState) => state.pokemonAllied);
    const [pokemon, setPokemon] = useState(props.data);

    const multiplicatorType = (target: any, type: any) => {
        const double = enemy.types.some((i: any) => type.damage_relations.double_damage_to.some((item: any) => item.name === i.type.name));
        const half = enemy.types.some((i: any) => type.damage_relations.half_damage_to.some((item: any) => item.name === i.type.name));
        const noDamage = enemy.types.some((i: any) => type.damage_relations.no_damage_to.some((item: any) => item.name === i.type.name));

        if (double) return 2;
        if (half) return 0.5;
        if (noDamage) return 0;
        return 1;
    };

    const attack = (target: 'enemy' | 'allied', move: any) => {
        requests.get.move(move.name).then(async res => {
            if (!res.power) res.power = 10;

            if (target === 'enemy') {
                
                let type = await requests.get.type(res.type.name);

                console.log('ALIADO', multiplicatorType(target, type));

                let damage = res.power / 1.5 + (allied.level) * multiplicatorType(target, type);
                    damage = getRandomIntFromInterval(damage - (damage / 2), damage + (damage / 2));

                const current = enemy.status.hp_current - damage;
                
                dispatch(setCurrentHpPokemonEnemy(current));
                dispatch(setBattleLog(`{allied} usou ${move.name}`));
                dispatch(setBattleLog(`{allied} causou ${damage} de dano em {enemy}`));

                return attack('allied', enemy.moves[getRandomIntFromInterval(0, enemy.moves.length - 1)].move);
            }

            if (target === 'allied') {
                let type = await requests.get.type(res.type.name);

                console.log('INIMIGO', multiplicatorType(target, type));

                let damage = res.power / 1.5 + (enemy.level) * multiplicatorType(target, type);
                    damage = getRandomIntFromInterval(damage - (damage / 2), damage + (damage / 2));

                const current = allied.status.hp_current - damage;

                dispatch(setCurrentHpPokemonAllied(current));
                dispatch(setBattleLog(`{enemy} usou ${move.name}`));
                dispatch(setBattleLog(`{enemy} causou ${damage} de dano em {allied}`));
            }
        });
    } // NEED REFACT

    useEffect(() => {
        setPokemon(props.data);
    }, [props.data]);

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
                        percentage={getPercentage(pokemon.status?.hp_current, pokemon.status?.hp_total)}
                    />

                    {!props.isSmall &&
                        <AttackBlock>
                            <Text>Ataques:</Text>
                            <List>
                                {pokemon.moves?.map((item: any, index: number) => {
                                    const move = item.move;

                                    return (
                                        <Item key={index} onClick={() => attack('enemy', move)}>
                                            <span>{move.name}</span>
                                        </Item>
                                    )
                                })}
                            </List>
                        </AttackBlock>
                    }
                </Block>
            </Box>
        </>
    )
}