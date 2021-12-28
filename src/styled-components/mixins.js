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

export const vcentered = (props) => {
  return `
    align-items: ${props.align ? props.align : "center"};
  `;
}

export const hcentered = (props) => {
  return `
    justify-content: ${props.justify ? props.justify : "center"};
  `;
}

export const popupMiddle = () => {
  return `
    position: absolute;
    transform: translate(-50%, -50%);
  `;
};

export const mt = (props) => {
  return `
    margin-top: ${props.mt ? props.mt : "90px" };
  `;
};

export const ml = (props) => {
  return `
    margin-left: ${props.ml ? props.ml : "0" };
  `;
};

export const m = (props) => {
  return `
    margin: ${props.m ? props.m : "0" };
  `;
};

export const pt = (props) => {
  return `
    padding-top: ${props.pt ? props.pt : "90px" };
  `;
};

export const p = (props) => {
  return `
    padding: ${props.p ? props.p : "0" };
  `;
};

export const shadow = (props) => {
  return `
    box-shadow: 2px 2px 6px 0px ${props.shadow ? props.shadow : "rgba(120, 120, 120, 0.8)"};
  `;
};

export const link = () => {
  return `
    text-decoration: none;
    opacity: 0.9;
    &:hover {
      opacity: 1;
      cursor: pointer;
    }
  `;
};
