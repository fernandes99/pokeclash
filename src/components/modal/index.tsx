import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { closeModal } from "../../store/reducers/global";
import { Box, InfoPKM, Overlay } from "./styles"

export const Modal = () => {
    const dispatch = useDispatch();
    const global = useSelector((state: RootState) => state.global);
    console.log(global.pokemon);

    return (
        <>
            {global.modal.actived &&
                <Overlay onClick={() => dispatch(closeModal(true))}>
                    {global.modal.type == 'pokemon_data' && (
                        <Box>
                            <img src={global.pokemon.image} alt={global.pokemon.name} />

                            <InfoPKM>
                                <span>XP Base: <b>{global.pokemon.xp.base}xp</b></span>
                                <span>XP Atual: <b>{global.pokemon.xp.current}xp</b></span>
                                <span>Próximo nível: <b>{global.pokemon.xp.next_level}xp</b></span>
                            </InfoPKM>
                        </Box>
                    )}
                </Overlay>
            }
        </>
    )
}