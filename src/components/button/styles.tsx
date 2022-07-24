import styled from 'styled-components';

export const PrimaryButton = styled.button`
    background-color: ${props => props.color ? props.color : 'var(--blue)'};
    height: 48px;
    border-radius: 12px;
    color: var(--white);
    font-size: 18px;
    font-weight: bold;
    transition: all .3s;
    cursor: pointer;

    &:hover {
        transform: scale(1.03);
    }
`

export const DefaultButton = styled.button`
    background-color: var(--gray-light);
    height: 48px;
    border-radius: 12px;
    color: var(--gray-dark);
    font-size: 18px;
    font-weight: bold;
    transition: all .3s;
    cursor: pointer;

    &:hover {
        transform: scale(1.03);
    }
`