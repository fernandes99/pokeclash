import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../store/reducers/user";
import { storage } from "../utils/storage"

export const auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = storage.get('user');

    if (user) dispatch(setUserData(user))
    else navigate('/bem-vindo');
}

export const logout = () => {}