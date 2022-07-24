import { Spinner } from "../general"
import { Overlay } from "./styles"

export const Loading = () => {
    return (
        <Overlay>
            <Spinner></Spinner>
        </Overlay>
    )
}