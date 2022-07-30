import styled from "styled-components";
import { PropsLifeType } from "./types";

export const Box = styled.div`
    display: flex;
    align-items: flex-start;

    @media (max-width: 860px) {
        align-items: center;
    }

`

export const Image = styled.img`
    background: radial-gradient(${props => `${props.color}80`} 20%, transparent 60%);
    margin-left: -12px;
`

export const Block = styled.div`
    width: 100%;
    margin: auto 0 auto 8px;
`
export const AttackBlock = styled.div`
    margin-top: 8px;
`

export const Text = styled.span`
    text-transform: capitalize;
    font-size: 16px;
    color: #4B4B4B;
`

export const Small = styled.span`
    font-size: 14px;
    color: #A5A5A5;
    margin-left: 8px;
`

export const List = styled.ul.attrs((props: any) => props)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    margin-top: 4px;
    gap: 4px;

    ${props => props.disabled ?
        {
            opacity: '.5',
            pointerEvents: 'none'
        } : ''
    }

    @media (max-width: 860px) {
        grid-template-columns: 1fr;
    }
`

export const Item = styled.li.attrs((props: any) => props)`
    position: relative;
    padding: 4px 8px 6px; 
    border: 1px solid #ECECEC;
    border-radius: 4px; 
    font-size: 14px;
    cursor: pointer;
    transition: all .2s;
    z-index: 1;

    &:hover {
        transform: scale(1.02);
    }

    &:before {
        content: '${props => props.type}';
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .9em;
        border: 1px solid ${props => props.color};
        color: ${props => props.color};
        text-transform: capitalize;
        padding-top: 2px;
        border-radius: 4px;
    }

    &:nth-last-of-type(-n+2) {
        z-index: 0;
    }
`

export const DamageIndicator = styled.div.attrs((props: any) => props)`
    position: absolute;
    background: #e2baba;
    left: 0;
    bottom: 0;
    width: ${props => `${props.damage}%`};
    height: 2px;
    border-radius: 20px;
    z-index: 1;
    transition: all .3s;

    &:hover {
        &:before {
            opacity: 1;
            display: flex;
        }
    }

    &:before {
        content: 'Indicador de dano';
        opacity: 0;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        background: #000000e3;
        color: white;
        text-align: center;
        padding: 4px 6px 5px;
        width: 96px;
        border-radius: 4px;
        transform: translateY(2px);
    }
`

export const LifeBar = styled.div.attrs((props: PropsLifeType) => props)`
    position: relative;
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background: var(--gray-light);
    transition: all .3s;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: ${props => `${props.percentage}%`};
        height: 100%;
        background:
            ${props => {
                    if (props.percentage >= 50) return '#2fd671';
                    if (props.percentage >= 20) return '#c8d433';
                    return '#d64646'
                }
            };
        border-radius: 5px;
        transition: all .3s;
    }

    &:after {
        content: '${props => props.current} / ${props => props.full}';
        color: ${props => {
                if (props.percentage >= 50) return '#2fd671';
                if (props.percentage >= 20) return '#c8d433';
                return '#d64646'
            }
        };
        position: absolute;
        font-size: 12px;
        bottom: 4px;
        right: 0px;
        transition: all .3s;
    }
`