import styled from "styled-components";

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px;
    border: 1px solid #ECECEC;
    border-radius: 6px;
    width: 100%;
`

export const Field = styled.div`
    display: grid;
    grid-template-columns: 3fr 2fr 120px;
    align-items: center;
    margin-bottom: 8px;
    padding: 8px 12px;
    background-color: #f7f7f7;
    border-radius: 6px;

    &:last-of-type {
        border-top: 1px solid #efefef;
        background-color: transparent;
        border-radius: 0;
        margin-bottom: 12px;
        padding: 12px;
    }
`

export const Action = styled.div`
    display: flex;
    align-items: center;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ddd;
        margin: 0px;
        text-align: center;
        background: #eee;
        cursor: pointer;
        width: 40px;
        height: 32px;

        &:first-child {
            padding-top: 1px;
            border-radius: 8px 0 0 8px;
        }

        &:last-child {
            padding-bottom: 3px;
            border-radius: 0 8px 8px 0;
        }
    }


    input {
        text-align: center;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        margin: 0px;
        width: 40px;
        height: 32px;

        &[type=number]::-webkit-inner-spin-button,
        &[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
`

export const Label = styled.span`

`

export const Content = styled.div`
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-template-rows: min-content;
    gap: 16px;
    padding: 32px;
`

export const Price = styled.span`
    color: green;
    line-break: strict;
`