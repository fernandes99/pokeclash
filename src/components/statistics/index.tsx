import { useEffect, useState } from "react";
import { Stats } from "./styles";

export const Statistics = (props: any) => {
    const [stats, setStats] = useState(props.data);

    useEffect(() => {
        setStats(props.data);
    }, [props.data]);

    return (
        <Stats>
            <ul>
                <li>
                    <span>Nome:</span>
                    <span>{stats.name}</span>
                </li>

                <li>
                    <span>Dinheiro:</span>
                    <span>R$ {stats.money}</span>
                </li>

                <li>
                    <span>Lutas:</span>
                    <span>{stats.fights}</span>
                </li>

                <li>
                    <span>Vitórias:</span>
                    <span>{stats.wins}</span>
                </li>

                <li>
                    <span>Derrotas:</span>
                    <span>{stats.losses}</span>
                </li>

                <li>
                    <span>Taxa de Vitórias:</span>
                    <span>{stats.winRate}%</span>
                </li>

                <li>
                    <span>Pokedéx:</span>
                    <span>{stats.pokemons.length} de 649</span>
                </li>
            </ul>
        </Stats>
    )
}