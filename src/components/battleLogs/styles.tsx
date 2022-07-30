import styled from "styled-components";

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    overflow: overlay;
    height: 100%;

    ::-webkit-scrollbar {
        width: 6px;
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: var(--gray-light);
        border-right: 5px solid transparent;
    }
`

export const Log = styled.span`
    line-height: 160%;
`

export const Hightlight = styled.strong`
    color: ${props => props.color};
`