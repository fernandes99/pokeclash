import styled from 'styled-components';

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--gray-lighter);
    border-radius: 8px;
    height: 100%;
`

export const Text = styled.span`
    font-size: 14px;
    line-height: 130%;
    margin-bottom: 6px;
    text-align: center;
`

export const Button = styled.button`
    background-color: #3C90F5;
    font-size: 14px;
    color: white;
    padding: 8px 24px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all .2s;

    &:hover {
        transform: translateY(-2px);
    }
`

export const SelectPokemonBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: var(--gray-lighter);
    border-radius: 8px;
    padding: 12px;
    height: 100%;
    
`