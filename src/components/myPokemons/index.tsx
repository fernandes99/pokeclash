import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { openModal, setPokemonGlobal } from "../../store/reducers/global";
import { setPokemonAllied } from "../../store/reducers/pokemonAllied";
import { colors } from "../../utils/colors";
import { Box, Info, Small, Text, Image } from "./styles";

export const MyPokemons = (props: any) => {
    const dispatch = useDispatch();
    const [ pokemons, setPokemons ] = useState(props.data);

    const handleSelect = (pkm: any) => {
        if (props.isSelectToBattle) {
            return dispatch(setPokemonAllied(pkm));
        }

        dispatch(setPokemonGlobal(pkm));
        dispatch(openModal('pokemon_data'));
    }

    useEffect(() => {
        setPokemons(props.data);
    }, [props.data])

    return (
        <Box direction={props.orientation}>
            <ul>
                {pokemons.map((pkm: any, index: number) => (
                    <li key={index} onClick={() => handleSelect(pkm)}>
                        <Image color={colors.pokemons[pkm.color]} src={pkm.image} />
                        <Info>
                            <Text>{pkm.name}</Text>
                            <Small>(Lv. {pkm.level})</Small>
                        </Info>
                    </li>
                ))}
            </ul>
        </Box>
    )
}