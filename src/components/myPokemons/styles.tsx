import styled from 'styled-components';

export const Box = styled.div.attrs((props: any) => props)`
    display: flex;
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

    ul {
        display: flex;
        flex-direction: ${props => props.direction ? props.direction : 'column'};
        flex-wrap: ${props => props.direction ? 'wrap' : 'no-wrap'};
        column-gap: 16px;
        align-items: flex-start;

        li {
            display: grid;
            grid-template-columns: 64px 120px;
            cursor: pointer;
            transition: all .2s;

            &:hover {
                transform: translateY(-2px);
            }
        }
    }
`

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const Text = styled.span`
    font-size: 14px;
    color: #4B4B4B;
    text-transform: capitalize;
    line-height: 120%;
    
`

export const Small = styled.span`
    font-size: 12px;
    color: #A5A5A5;
`

export const Image = styled.img`
    background: radial-gradient(${props => `${props.color}80`} 20%, transparent 60%);
`

export const XpBar = styled.div.attrs((props: any) => props)`
    position: relative;
    width: 100%;
    height: 3px;
    border-radius: 5px;
    background: var(--gray-light);
    margin-top: 4px;
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
                    if (props.percentage >= 80) return '#a6b0be';
                    return '#c5cedd';
                }
            };
        border-radius: 5px;
        transition: all .3s;
    }
`