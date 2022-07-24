import { useNavigate } from "react-router-dom"
import { storage } from "../../../../utils/storage";
import { Box } from "./styles"

export const Header = () => {
    const navigate = useNavigate();

    const logout = () => {
        storage.clear();
        navigate('/bemvindo');
    }

    return (
        <Box>
            <ul>
                <li>
                    <button onClick={() => navigate('/')}>Explorar</button>
                </li>
                <li>
                    <button onClick={() => navigate('/loja')}>Loja</button>
                </li>
                <li>
                    <button onClick={() => navigate('/pokedex')}>Pokedex</button>
                </li>
                <li>
                    <button onClick={() => logout()}>Sair</button> 
                </li>
            </ul>
        </Box>
    )
}