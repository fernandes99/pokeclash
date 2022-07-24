import { useDispatch, useSelector } from "react-redux"
import { MyPokemons } from "../../../../components/myPokemons";
import { RootState } from "../../../../store";
import { setExplore } from "../../../../store/reducers/global";
import { Box, Text, Button, SelectPokemonBlock } from "./styles"

export const ExploreBlock:React.FC = () => {
    const dispatch = useDispatch();

    return (
        <Box>
            <Text>Procure por um <br />pokemon selvagem</Text>
            <Button onClick={() => dispatch(setExplore(true))}>Procurar</Button>
        </Box>
    )
}

export const SelectPokemonToBattle:React.FC = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <SelectPokemonBlock>
            <Text>Selecione um pokemon:</Text>
            <MyPokemons data={user.pokemons} isSelectToBattle={true} />
        </SelectPokemonBlock>
    )
}