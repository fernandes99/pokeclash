import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setCurrentHpPokemonEnemy } from "../store/reducers/pokemonEnemy";
import { requests } from "./requests";

export class Action {
    dispatch = useDispatch();
    enemy = useSelector((state: RootState) => state.pokemonEnemy)
    self = '';

    contructor (self: 'enemy' | 'allied') {
        this.self = self;
    }

    attack (move: any, target: 'enemy' | 'allied') {
        requests.get.move(move.name).then(res => {
            if (!res.power) move.power = 5;
            if (target === 'enemy') this.dispatch(setCurrentHpPokemonEnemy(this.enemy.status.hp_current - (move.power / 2)));
        });
    }
}