import { setBattleLog } from "../store/reducers/battleLogs";
import { blockActions, setBattleLose, setBattleWin, setExplore, setLevelUped } from "../store/reducers/global";
import { setCurrentHpPokemonAllied, addXpPokemonAllied } from "../store/reducers/pokemonAllied";
import { setCurrentHpPokemonEnemy } from "../store/reducers/pokemonEnemy";
import { setUserData } from "../store/reducers/user";
import { PokemonType, UserStateType } from "../store/types";
import { getWinRate, getRandomIntFromInterval, sleep } from "./general";

export const actions:any = {
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

        if (target === 'enemy') {
            await sleep(100);

            const multiplicator = multiplicatorType(move.type);

            let damage = move.power / 4 + (allied.level) * multiplicator * 20;
                damage = getRandomIntFromInterval(damage * 0.5, damage * 1.5);

            const current = enemy.status.hp_current - damage;
            
            dispatch(setCurrentHpPokemonEnemy(current));
            dispatch(setBattleLog(`{allied} usou ${move.name}`));
            dispatch(setBattleLog(`{allied} causou ${damage} de dano em {enemy}`));

            if (multiplicator === 2) dispatch(setBattleLog(`Isso foi super efetivo!`));
            if (multiplicator === 0.5) dispatch(setBattleLog(`Isso não foi efetivo!`));

            if (current <= 0) {
                // const xpGapCurrentLevel = allied.xp.next_level - (allied.level * allied.xp.base);
                let expGained = (allied.xp.base * 0.7) * (enemy.level / allied.level) * 10;
                    expGained = getRandomIntFromInterval(expGained * 0.5, expGained * 1.5);
                    expGained = Math.round(expGained);

                let moneyGained = 80 * enemy.level / allied.level;
                    moneyGained = getRandomIntFromInterval(moneyGained * 0.5, moneyGained * 1.5);
                    moneyGained = Math.round(moneyGained);

                const levelUped = (allied.xp.current + expGained) >= allied.xp.next_level;
                if (levelUped) dispatch(setLevelUped(true));

                dispatch(addXpPokemonAllied(expGained));
                dispatch(setCurrentHpPokemonAllied(allied.status.hp_total));

                const userData = {
                    money: user.money + moneyGained,
                    fights: user.fights + 1,
                    wins: user.wins + 1,
                    losses: user.losses,
                    winRate: getWinRate(user.wins + 1, user.losses)
                }

                dispatch(setUserData(userData));

                alert(`Você derrotou ${enemy.name} e seu ${allied.name} ganhou ${expGained} de experiência`);
                alert(`Parabéns, você ganhou R$ ${moneyGained}`);

                dispatch(setBattleWin(true));
                dispatch(blockActions(false));

                return;
            }

            return actions.attack('allied', dispatch, enemy, allied, user, enemy.moves[getRandomIntFromInterval(0, enemy.moves.length - 1)]);
        } // REFATORAR. Código repetidos com o target no aliado e enemy: separar por turnos.

        if (target === 'allied') {
            const multiplicator = multiplicatorType(move.type);

            let damage = move.power / 4 + (enemy.level) * multiplicator;
                damage = getRandomIntFromInterval(damage * 0.5, damage * 1.5);

            const current = allied.status.hp_current - damage;

            dispatch(setCurrentHpPokemonAllied(current));
            dispatch(setBattleLog(`{enemy} usou ${move.name}`));
            dispatch(setBattleLog(`{enemy} causou ${damage} de dano em {allied}`));

            if (multiplicator === 2) dispatch(setBattleLog(`Isso foi super efetivo!`));
            if (multiplicator === 0.5) dispatch(setBattleLog(`Isso não foi efetivo!`));

            if (current <= 0) {
                let expGained = (((allied.xp.next_level - allied.xp.current) * 0.2) * (enemy.level / allied.level)) / 2;
                    expGained = getRandomIntFromInterval(expGained * 0.5, expGained * 1.5);
                    expGained = Math.round(expGained);

                let moneyLossed = Math.round((40 * allied.level / enemy.level) * 0.2)
                    moneyLossed = getRandomIntFromInterval(moneyLossed * 0.5, moneyLossed * 1.5);
                    moneyLossed = Math.round(moneyLossed);

                const levelUped = (allied.xp.current + expGained) >= allied.xp.next_level;
                if (levelUped) dispatch(setLevelUped(true));

                dispatch(addXpPokemonAllied(expGained));
                dispatch(setCurrentHpPokemonAllied(allied.status.hp_total));
                
                const userData = {
                    money: user.money - moneyLossed,
                    fights: user.fights + 1,
                    wins: user.wins,
                    losses: user.losses + 1,
                    winRate: getWinRate(user.wins, user.losses + 1)
                }

                dispatch(setUserData(userData));

                alert(`Você foi derrotado por ${enemy.name} e seu ${allied.name} ganhou apenas ${expGained} de experiência`);
                alert(`Você perdeu R$${Math.abs(moneyLossed)}`);

                dispatch(setBattleLose(true));
            }

            dispatch(blockActions(false));
        }
    }
}