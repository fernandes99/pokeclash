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

    @media (max-width: 860px) {
        padding: 18px 8px 8px;
    }
`
export const Block = styled.div`
    display: grid;
    grid-template-rows: 60% 40%;
    gap: 4px;
    height: 100%;
`

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 160px 100px 200px;
    grid-template-areas: "battle battle statistics"
                         "battle battle items"
                         "logs   logs   pokemons";
    gap: 12px;
    height: 100%;
    width: 100%;
    padding: 24px;

    #battle { grid-area: battle; }

    #statistics {
        grid-area: statistics;
        padding: 16px 16px 0 16px;
    }

    #items {
        grid-area: items;
        padding: 16px 16px 0 16px;
    }

    #pokemons {
        grid-area: pokemons;
        padding: 16px;
    }

    #logs {
        grid-area: logs;
        padding: 24px 16px 16px;
    }

    @media (max-width: 860px) {
        padding: 24px 8px 8px;
        grid-template-columns: 1fr;
        grid-template-rows: 360px 0px 200px 200px;
        grid-template-areas: "battle"
                             "battle"
                             "logs"
                             "items"
                             "statistics"
                             "pokemons";
    }
`