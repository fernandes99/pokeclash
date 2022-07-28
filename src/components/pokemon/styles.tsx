import styled from "styled-components";
import { PropsLifeType } from "./types";

export const Box = styled.div`
    display: flex;
    align-items: flex-start;
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
`

export const Item = styled.li`
    padding: 4px 8px; 
    border: 1px solid #ECECEC;
    border-radius: 4px; 
    font-size: 14px;
    cursor: pointer;
    transition: all .2s;

    &:hover {
        transform: scale(1.02);
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