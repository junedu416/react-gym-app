
export const flexbox = (props) => {
  return `
    display: flex;
    flex-direction: column;
  `
}
// flex-direction: ${props => props.direction ? "row" : "column"};

export const centered = () => {
  return `
    justify-content: center;
    align-items: center;
  `
}

export const middle = () => {
  return `
    position: absolute;
    transform: translate(-50%, -50%);
  `
}