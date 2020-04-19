interface themeProperties {
  colors: {
    text: string;
    textInverted: string;
    primary: string;
    inverted: string;
    info: string;
    confirm: string;
    warning: string;
    danger: string;
  };
  fontSizes: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  widths: {
    tablet: string;
    desktop: string;
  };
  nav: {
    height: string;
    backgroundColor: string;
  };
  panel: {
    backgroundColor: string;
  };
  borderRadius: string;
}

const theme: themeProperties = {
  colors: {
    text: "#ecf0f1",
    textInverted: "#1c2e30",
    primary: "#ecf0e1",
    inverted: "#2c3e50",
    info: "#84e8ff",
    confirm: "#6efc61",
    warning: "#f1c40f",
    danger: "#f75c3c",
  },
  fontSizes: {
    mobile: "1.4rem",
    tablet: "1.6rem",
    desktop: "1.8rem",
  },
  widths: {
    tablet: "768px",
    desktop: "1024px",
  },
  nav: {
    height: "63px",
    backgroundColor: "rgba(50, 50, 50, 0.75)",
  },
  panel: {
    backgroundColor: "rgba(50, 50, 50, 0.9)",
  },
  borderRadius: "4px",
};

export default theme;
