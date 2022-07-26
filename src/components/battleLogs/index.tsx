import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import reactStringReplace from 'react-string-replace';

import { Box, Hightlight, Log } from "./styles";
import { colors } from "../../utils/colors";

export const BattleLogs = (props: any) => {
    const [logs, setLogs] = useState(props.logs);
    const enemy = useSelector((state: RootState) => state.pokemonEnemy);
    const allied = useSelector((state: RootState) => state.pokemonAllied);

    const formatLogs = (logs: any) => {
        setLogs(logs);
    }

    useEffect(() => {
        formatLogs(props.logs);
    }, [props.logs]);

    return (
        <Box>
            {logs.map((log: any, index: number) => {
                let logFormated: any;

                logFormated = reactStringReplace(log, '{enemy}', (match, i) => <Hightlight key={Math.random()} color={colors.pokemons[enemy.color]}>{enemy.name}</Hightlight>);
                logFormated = reactStringReplace(logFormated, '{allied}', (match, i) => <Hightlight key={Math.random()} color={colors.pokemons[allied.color]}>{allied.name}</Hightlight>);

                return (
                    <Log key={index}>{logFormated}</Log>
                )
            })}
        </Box>
    )
}