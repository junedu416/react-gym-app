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
};

export const hcentered = (props) => {
  return `
    justify-content: ${props.justify ? props.justify : "center"};
  `;
};

export const popupMiddle = () => {
  return `
    position: absolute;
    transform: translate(-50%, -50%);
  `;
};

export const mt = (props) => {
  return `
    margin-top: ${props.mt ? props.mt : "90px"};
  `;
};

export const mb = (props) => {
  return `
    margin-bottom: ${props.mb ? props.mb : "0"};
  `;
};

export const ml = (props) => {
  return `
    margin-left: ${props.ml ? props.ml : "0"};
  `;
};

export const m = (props) => {
  return `
    margin: ${props.m ? props.m : "0"};
  `;
};

export const mr = (props) => {
  return `
    margin-right: ${props.mr ? props.mr : "0"};
  `;
};

export const pt = (props) => {
  return `
    padding-top: ${props.pt ? props.pt : "90px"};
  `;
};

export const p = (props) => {
  return `
    padding: ${props.p ? props.p : "0"};
  `;
};

export const pl = (props) => {
  return `
    padding-left: ${props.pl ? props.pl : "0"};
  `;
};

export const w = (props) => {
  return `
    width: ${props.w ? props.w : ""};
  `;
};

export const minw = (props) => {
  return `
    min-width: ${props.minw ? props.minw : ""};
  `;
};

export const fontSize = (props) => {
  return `
    font-size: ${props.fontSize ? props.fontSize : "1rem"};
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
      cursor: pointer;
    }
  `;
};

export const greyBorder = () => {
  return `
    border: 1px solid rgba(120, 120, 120, 0.3);
  `;
};

export const hoverMixin = () => {
  return `
  transition: all 0.7s;
  &:hover {
    background: rgba(0, 145, 250, 0.18);
    background-color: rgba(0, 145, 250, 0.18);
    opacity: 1;
    cursor: pointer;
    color: rgba(80, 80, 80, 0.9);
  }
  `;
};

export const bg = (props) => {
  return `
    background-color: ${props.bg ? props.bg : "transparent"};
    background: ${props.bg ? props.bg : "transparent"};

  `
}

export const br = (props) => {
  return `
    border-radius: ${props.br ? props.br : ""};

  `
}

export const mainTextColor = () => {
  return`
    color: blue;
  `
}

export const mainParagraphColor = () => {
  return`
    color: rgb(56, 56, 56);
  `
}

export const backgroundColor = () => {
  return`
    background: rgba(40, 100, 150, 0.1);
  `
}

export const containEventInScreen = () => {
  return`
  max-width: 90vw;
  @media(min-width: 768px) {
        max-width: 600px;
  }
  `
}