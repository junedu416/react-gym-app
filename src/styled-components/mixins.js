
export const flexbox = (props) => {
  return `
    display: flex;
    flex-direction: column;
    // flex-direction: ${props => props ? props : "column"};
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

export const mt = () => {
  return `
    margin-top: 90px;
  `
}

export const pt = () => {
  return `
    padding-top: 90px;
  `
}

export const shadow = () => {
  return `
    box-shadow: 2px 2px 6px 0px rgba(120, 120, 120, 0.8);
  ` 
}