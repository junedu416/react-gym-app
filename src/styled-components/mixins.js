export const flexbox = (props) => {
  return `
    display: flex;
    flex-direction: ${props.direction ? props.direction : "column"};
  `;
};
// flex-direction: ${props => props.direction ? "row" : "column"};

export const centered = (props) => {
  return `
    justify-content: ${props.justify ? props.justify : "center"};
    align-items: ${props.align ? props.align : "center"};
  `;
};

export const popupMiddle = () => {
  return `
    position: absolute;
    transform: translate(-50%, -50%);
  `;
};

export const mt = () => {
  return `
    margin-top: 90px;
  `;
};

export const pt = () => {
  return `
    padding-top: 90px;
  `;
};

export const shadow = () => {
  return `
    box-shadow: 2px 2px 6px 0px rgba(120, 120, 120, 0.8);
    `;
  };
  // box-shadow: ${props.shadow ? props.shadow (props.shadowColor ? props.shadowColor : "rgba(120, 120, 120, 0.8)") : "2px 2px 6px 0px"};
  
export const link = () => {
  return `
    text-decoration: none;
    opacity: 0.9;
    &:hover {
      opacity: 1;
    }
  `;
};

export const greyBorder = () => {
  return `
    border: 1px solid rgba(120, 120, 120, 0.3);
  `
}
