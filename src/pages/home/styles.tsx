import styled from 'styled-components';

export const Box = styled.div`
    position: relative;
    border: 1px solid #ECECEC;
    border-radius: 6px;
    padding: 24px;
    color: #717171;
    font-size: 14px;

    &:before {
        content: '${props => props.title}';
        position: absolute;
        top: -20px;
        left: 8px;
        transform: translateY(50%);
        background-color: #fff;
        padding: 0 8px;
    }
`
export const Block = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 4px;
    height: 100%;
`

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 2fr 1fr 2fr;
    grid-template-areas: "battle battle statistics"
                         "battle battle items"
                         "logs   logs   pokemons";
    gap: 12px;
    height: 100%;
    width: 100%;
    padding: 0 24px 24px;

    #battle { grid-area: battle; }

    #statistics {
        grid-area: statistics;
        padding: 16px;
    }

    #items {
        grid-area: items;
        padding: 16px;
    }

    #pokemons {
        grid-area: pokemons;
        padding: 16px;
    }

    #logs { grid-area: logs; }
`