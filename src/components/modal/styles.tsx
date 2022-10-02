import styled from 'styled-components';

export const Overlay = styled.div`
    position: absolute;
    top: 58px;
    right: 0;
    width: 100%;
    height: 100%;
    background: #ffffffbb;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Box = styled.div`
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 16px;
`;

export const InfoPKM = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    b {
        font-weight: bold;
    }
`