import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 800px;
  margin: 0 auto;

  ::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: var(--gray-light);
      border-right: 5px solid transparent;
  }
`

export const Input = styled.input`
  width: 100%;
`

export const Spinner = styled.div`
    @keyframes loadFrame {
        33%  { inset: -10px; transform: rotate(0deg)  }
        66%  { inset: -10px; transform: rotate(90deg) }
        100% { inset: 0    ; transform: rotate(90deg) }
    }

    width: 40px;
    height: 40px;
    color:#f03355;
    position: relative;
    background: radial-gradient(10px,currentColor 94%,#0000);z

    &:before {
        content:'';
        position: absolute;
        inset:0;
        border-radius: 50%;
        background:
            radial-gradient(9px at bottom right,#0000 94%,currentColor) top    left,
            radial-gradient(9px at bottom left ,#0000 94%,currentColor) top    right,
            radial-gradient(9px at top    right,#0000 94%,currentColor) bottom left,
            radial-gradient(9px at top    left ,#0000 94%,currentColor) bottom right;
        background-size:20px 20px;
        background-repeat: no-repeat;
        animation: loadFrame 1.5s infinite cubic-bezier(0.3,1,0,1);
    }
`