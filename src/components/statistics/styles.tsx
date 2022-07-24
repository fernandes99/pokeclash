import styled from "styled-components";

export const Stats = styled.div`
    li {
        display: grid;
        grid-template-columns: 3fr 2fr;

        span:first-child {
            color: #737373;
        }

        button {
            color: #3C90F5;
            text-decoration: underline;
            padding: 0;
            text-align: left;
            cursor: pointer;

            &:disabled {
                color: #979797;
                cursor: no-drop;
            }
        }
    }
`