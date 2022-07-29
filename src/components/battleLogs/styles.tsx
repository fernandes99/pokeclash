import styled from "styled-components";

export const Box = styled.div`
    display: flex;
    flex-direction: column;
`

export const Log = styled.span`
    line-height: 160%;
`

export const Hightlight = styled.strong`
    color: ${props => props.color};
`