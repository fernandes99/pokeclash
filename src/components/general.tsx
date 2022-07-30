import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
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

  @media (max-width: 860px) {

  }
`

export const Input = styled.input`
  width: 100%;
`

export const Spinner = styled.div.attrs((props: any) => props)`
    @keyframes loadFrame {
        33%  { inset: -10px; transform: rotate(0deg)  }
        66%  { inset: -10px; transform: rotate(90deg) }
        100% { inset: 0    ; transform: rotate(90deg) }
    }

    width: ${props => props.size ? `${props.size}px` : '40px'};
    height: ${props => props.size ? `${props.size}px` : '40px'};
    color:#f03355;
    position: relative;
    background: radial-gradient(${props => props.size ? `${props.size/3}px` : '10px'}, currentColor 94%, #0000);
    display: flex;
    margin: ${props => props.align === 'center' ? 'auto' : 0};

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
        background-size: ${props => props.size ? `${props.size/1.6}px` : '20px'} ${props => props.size ? `${props.size/1.6}px` : '20px'};;
        background-repeat: no-repeat;
        animation: loadFrame 1.5s infinite cubic-bezier(0.3,1,0,1) !important;
    }
`