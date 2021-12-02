import styled, { css } from 'styled-components';

const flexbox = css`
  display: flex;
  flex-direction: ${({ direction }) => `${direction || "column"}`};
`
const centered = css`
  justify-content: center;
  align-items: center;
`

const middle = css`
  position: absolute;
  transform: translate(-50%, -50%);
`

export const Container = styled.div`
  ${flexbox};
  ${centered};
`

