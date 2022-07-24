import { useEffect, useState } from "react";
import { Stats } from "../statistics/styles";

export const Items = (props: any) => {
    const [items, setItems] = useState(props.data);

    useEffect(() => {
        setItems(props.data);
    }, [props.data]);

    return (
        <Stats>
            <ul>
                <li>
                    <span>Pokebola:</span>
                    <span>{items.pokeballs}</span>
                </li>

                <li>
                    <span>Poções:</span>
                    <span>{items.potions}</span>
                </li>
            </ul>
        </Stats>
    )
}