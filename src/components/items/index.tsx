import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setUserNewPokemon } from "../../store/reducers/user";
import { getRandomIntFromInterval } from "../../utils/general";
import { Stats } from "../statistics/styles";

export const Items = (props: any) => {
    const dispatch = useDispatch();
    const [items, setItems] = useState(props.data);
    const global = useSelector((state: RootState) => state.global);
    const enemy = useSelector((state: RootState) => state.pokemonEnemy);

    const usePokeball = () => {
        if (!global.explore) return alert('Você não está em batalha.');
        if (!items.pokeballs) return alert('Você não tem pokebolas para usar.');

        const random = getRandomIntFromInterval(0, 100);

        if (enemy.capture_rate >= random) {
            alert(`Parabéns, você conseguiu capturar ${enemy.name}`);
            dispatch(setUserNewPokemon(enemy));
            location.reload();
        }
        else return alert('FAILED');
    }

    const usePotion = () => {
        if (!global.explore) return alert('Você não está em batalha.');
        if (!items.potions) return alert('Você não tem poções para usar.');
    }

    useEffect(() => {
        setItems(props.data);
    }, [props.data]);

    return (
        <Stats>
            <ul>
                <li>
                    <button disabled={!items.pokeballs} title="Usar pokebola" onClick={usePokeball}>Pokebola:</button>
                    <span>{items.pokeballs}</span>
                </li>

                <li>
                    <button disabled={!items.potions} title="Usar poção" onClick={usePotion}>Poções:</button>
                    <span>{items.potions}</span>
                </li>
            </ul>
        </Stats>
    )
}