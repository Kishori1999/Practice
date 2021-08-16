const palette = {
  dark: {
    main: "#000a1d",
    mainRGB: "0,10,29",
  },
  light: {
    background: "rgb(247, 247, 247)",
    main: "#ffffff",
    grey: "#8e8e8e",
    lightGrey: "#c6c8cb",

    mainRGB: "255,255,255",
  },
  orange: {
    light: "#fd6e29",
    main: "#ff5200",
    mainRGB: "255,82,0",
    mainWithLightOpacity: "#ff520090",
    mainWithOpacity: "#ff520050",
    dark: "#8e2a00",
  },
  blue: {
    lightest: "#00ffff",
    light: "#46cbe5",
    epic: "#40c6e2",
    main: "#16a0cc",
    dark: "#0590c3",
  },
  purple: {
    main: "#a72eda",
    earth: "#9c00ff",
  },
  faction: {
    empire: {
      light: "#6b7f91",
      dark: "#476072",
    },
    glade: {
      light: "#6aa84f",
      dark: "#407a25",
    },
    horde: {
      light: "#cc0000",
      dark: "#9e0606",
    },
  },
  class: {
    ranger: {
      light: "#134f5c",
      dark: "#093c44",
    },
    melee: {
      light: "#9e5100",
      dark: "#823f03",
    },
    mage: {
      light: "#351c75",
      dark: "#09003a",
    },
  },
  element: {
    earth: {
      light: "#38761d",
      dark: "#2a6011",
    },
    fire: {
      light: "#ff6d01",
      dark: "#e52b00",
    },
    water: {
      light: "#83e3f0",
      dark: "#12a2c4",
    },
    dark: {
      light: "#4d485e",
      dark: "#302c44",
    },
    light: {
      light: "#fff9e9",
      dark: "#fcecca",
    },
  },
  rarity: {
    common: {
      light: "#d9d9d9",
      dark: "#bfbfbf",
    },
    rare: {
      light: "#0070dd",
      dark: "#0047af",
    },
    epic: {
      light: "#a335ee",
      dark: "#7b14cc",
    },
    legendary: {
      light: "#ffc500",
      dark: "#ff9100",
    },
  },
  green: {
    light: "#2eda73",
    main: "#009a6f",
    dark: "rgba(5, 144, 195, 0.2)",
    semidark: "rgba(70, 203, 229, 0.2)",
  },
};
const breakpoints = {
  xs: "360px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1600px",
  xxxl: "2560px",
};

const devices = {
  xs: `screen and (min-width: ${breakpoints.xs})`,
  sm: `screen and (min-width: ${breakpoints.sm})`,
  md: `screen and (min-width: ${breakpoints.md})`,
  lg: `screen and (min-width: ${breakpoints.lg})`,
  xl: `screen and (min-width: ${breakpoints.xl})`,
  xxl: `screen and (min-width: ${breakpoints.xxl})`,
  xxxl: `screen and (min-width: ${breakpoints.xxxl})`,
};

const spaces = {
  sm: "0.8em",
  md: "1em",
};

const fontSizes = {
  small: "0.55rem",
  xs: "0.875rem",
  big: "1.625rem",
  base: "1rem",
  accented: "1.25rem",
  h4: "1.9rem",
  h3: "2.25rem",
  h2: "3.0rem",
  h1: "4.625rem",
};

const fontFamily = {
  main: "'Open Sans', sans-serif",
  secondary: "'Editor', serif",
};

const header = {
  height: "54px",
  heightXl: "64px",
  heightXXl: "84px",
  break: devices.xl,
  zIndex: 600,
};

const homepage = {
  loadingTime: 1,
  introduction: {
    sliderBreak: devices.md,
  },
};

const rewards = {
  milestonesBreak: `screen and (min-width: 1600px)`,
};

const store = {
  sliderBreak: `screen and (min-width: 1714px)`,
  floatBarBreak: devices.md,
  cartBarBreak: devices.md,
};

const collections = {
  sideBarWidth: "17.3em",
  searchPadding: "0.7rem",
  mobileBarHeight: "5.5rem",
  barHeight: "3.9rem",
  filterBreak: `screen and (min-width: 887px)`,
  letterSpacing: "0.0975em",
  cardBreak: `screen and (min-width: 1430px)`,
  cardWidth: 19,
  gridGap: 1.9,
};

const summoning = {
  menuCardSize: "19rem",
  headingOffsetTop: "5rem",
  headingOffsetTopMobile: "2rem",
  menuBreak: devices.lg,
};

const content = {
  maxWidth: "1200px",
};

const gradients = {
  button: {
    main: `linear-gradient(to right, ${palette.blue.dark} 0%, ${palette.blue.light} 100%)`,
    orange: `linear-gradient(to right, #fc7650 0%, #ffb200 100%)`,
    green: `linear-gradient(to right, ${palette.green.main} 0%, ${palette.green.dark} 100%)`,
    connect: `linear-gradient(to right, ${palette.green.dark} 0%, ${palette.green.semidark} 100%)`,
  },
};

const token = {
  breakpoints,
  palette,
  spaces,
  fontFamily,
  fontSizes,
  header,
  rewards,
  homepage,
  summoning,
  content,
  store,
  gradients,
  collections,
};

export default token;
export { devices, breakpoints };
