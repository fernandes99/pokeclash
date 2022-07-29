import { setBattleLog } from "../store/reducers/battleLogs";
import { blockActions, setBattleLose, setBattleWin, setExplore, setLoading } from "../store/reducers/global";
import { setCurrentHpPokemonAllied, addXpPokemonAllied } from "../store/reducers/pokemonAllied";
import { setCurrentHpPokemonEnemy } from "../store/reducers/pokemonEnemy";
import { setUserData, setUserMoney } from "../store/reducers/user";
import { PokemonType, UserStateType } from "../store/types";
import { getPercentage, getRandomIntFromInterval, sleep } from "./general";
import { requests } from "./requests";

export const actions = {
    attack: async (target: 'enemy' | 'allied', dispatch: any, enemy: PokemonType, allied: PokemonType, user: UserStateType, move: any) => {
        dispatch(blockActions(true));

        const multiplicatorType = (type: any) => {
            const double = enemy.types.some((i: any) => type.damage_relations.double_damage_to.some((item: any) => item.name === i.type.name));
            const half = enemy.types.some((i: any) => type.damage_relations.half_damage_to.some((item: any) => item.name === i.type.name));
            const noDamage = enemy.types.some((i: any) => type.damage_relations.no_damage_to.some((item: any) => item.name === i.type.name));
    
            if (double) return 2;
            if (half) return 0.5;
            if (noDamage) return 0;
            return 1;
        };

        requests.get.move(move.name).then(async res => {
            const type = await requests.get.type(res.type.name);

            if (!res.power) res.power = 10;

            if (target === 'enemy') {
                let damage = res.power / 3 + (allied.level) * multiplicatorType(type);
                    damage = getRandomIntFromInterval(damage - (damage / 2), damage + (damage / 2));

                const current = enemy.status.hp_current - damage;
                
                dispatch(setCurrentHpPokemonEnemy(current));
                dispatch(setBattleLog(`{allied} usou ${move.name}`));
                dispatch(setBattleLog(`{allied} causou ${damage} de dano em {enemy}`));

                if (current <= 0) {
                    let expGained = allied.xp.base * (enemy.level / allied.level);
                        expGained = getRandomIntFromInterval(expGained / 1.5, expGained * 1.5);
                        expGained = Math.round(expGained);

                    let moneyGained = 20 * enemy.level / allied.level;
                        moneyGained = getRandomIntFromInterval(moneyGained / 1.5, moneyGained * 1.5);
                        moneyGained = Math.round(moneyGained);

                    dispatch(addXpPokemonAllied(expGained));
                    dispatch(setCurrentHpPokemonAllied(allied.status.hp_total));

                    const userData = {
                        fights: user.fights + 1,
                        wins: user.wins + 1,
                        losses: user.losses,
                        winRate: getPercentage(user.wins + 1, user.losses)
                    }

                    dispatch(setUserData(userData));

                    alert(`Você derrotou ${enemy.name} e ${allied.name} ganhou ${expGained} de experiencia`);
                    alert(`Parabéns, você ganhou R$ ${moneyGained}`);

                    dispatch(setBattleWin(true));
                    dispatch(blockActions(false));
                    dispatch(setExplore(false));

                    return;
                }

                return actions.attack('allied', dispatch, enemy, allied, user, enemy.moves[getRandomIntFromInterval(0, enemy.moves.length - 1)].move);
            }

            if (target === 'allied') {
                let damage = res.power / 1.5 + (enemy.level) * multiplicatorType(type);
                    damage = getRandomIntFromInterval(damage - (damage / 2), damage + (damage / 2));

                const current = allied.status.hp_current - damage;

                dispatch(setCurrentHpPokemonAllied(current));
                dispatch(setBattleLog(`{enemy} usou ${move.name}`));
                dispatch(setBattleLog(`{enemy} causou ${damage} de dano em {allied}`));

                if (current <= 0) {
                    let expGained = (allied.xp.base * (enemy.level / allied.level)) / 10;
                        expGained = getRandomIntFromInterval(expGained / 1.5, expGained * 1.5);
                        expGained = Math.round(expGained);

                    let moneyLossed = Math.round((10 * enemy.level / allied.level) * -0.2);
                        moneyLossed = getRandomIntFromInterval(moneyLossed / 1.5, moneyLossed * 1.5);
                        moneyLossed = Math.round(moneyLossed);

                    dispatch(addXpPokemonAllied(expGained));
                    dispatch(setCurrentHpPokemonAllied(allied.status.hp_total));
                    
                    const userData = {
                        fights: user.fights + 1,
                        wins: user.wins,
                        losses: user.losses + 1,
                        winRate: getPercentage(user.wins, user.losses + 1)
                    }

                    dispatch(setUserData(userData));

                    alert(`Você foi derrotado por ${enemy.name}. Seu ${allied.name} ganhou apenas ${expGained} de experiencia`);
                    alert(`Você perdeu R$${Math.abs(moneyLossed)}`);

                    dispatch(setExplore(false));
                    dispatch(setBattleLose(true));
                }

                dispatch(blockActions(false));
            }
        });
    }
}