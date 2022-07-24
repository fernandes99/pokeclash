import styled from 'styled-components';

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    height: 100%;
    justify-content: center;
    margin: auto;
`

export const Text = styled.p`
    font-size: 18px;
    color: var(--gray-darker);
`

export const Title = styled.h1`
    font-size: 52px;
    background: linear-gradient(to right, var(--purple) 0%, var(--blue) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    line-height: 100%;
    margin-bottom: 16px;
`

export const Input = styled.input`
    border: 1px solid var(--gray-light);
    border-radius: 12px;
    padding: 12px 16px;
    height: 48px;
    width: 100%;
    transition: all .2s;
    margin-bottom: 8px;

    &:focus {
        border-color: var(--blue);
    }
`

export const Button = styled.button`
    background-color: var(--blue);
    height: 48px;
    border-radius: 12px;
    color: var(--white);
    font-size: 18px;
    font-weight: bold;
    margin-top: 8px;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const ChoiceBox = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 8px;
`

export const Choice = styled.button`
    position: relative;
    border: 1px solid #ECECEC;
    border-radius: 8px;
    padding: 0 8px 8px;
    cursor: pointer;
    transition: all .2s;

    &:hover {
        transform: scale(1.02) translateY(-2px);
    }

    span {
        text-transform: capitalize;
    }
`