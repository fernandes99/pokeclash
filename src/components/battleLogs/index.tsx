import { useEffect, useState } from "react";

export const BattleLogs = (props: any) => {
    const [logs, setLogs] = useState(props.logs);

    useEffect(() => {
        setLogs(props.logs);
    }, [props.logs]);

    return (
        <>
            {logs && logs}
        </>
    )
}