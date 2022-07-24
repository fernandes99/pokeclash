import styled from "styled-components";

export const Box = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    width: 100%;
    height: 58px;
    background: #3C90F5;
    padding: 0 24px;

    ul {
        display: flex;
        align-items: center;

        li button {
            color: white;
            font-weight: bold;
            font-size: 14px;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: all .3s;

            &:active, &:hover {
                background-color: #2C7EE0;
            }
        }
    }
`