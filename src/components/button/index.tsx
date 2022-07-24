import { PrimaryButton, DefaultButton } from "./styles";
import { ButtonType, PrimaryButtonType, DefaultButtonType } from "./types";

export const Button: ButtonType = {
    Primary: (props: PrimaryButtonType) => {
        return (
            <PrimaryButton color={props.color} onClick={props.onClick}>{props.text}</PrimaryButton>
        )
    },
    Default: (props: DefaultButtonType) => {
        return (
            <DefaultButton onClick={props.onClick}>{props.text}</DefaultButton>
        )
    }
}