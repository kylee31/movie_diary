interface ThemeColorType {
  cgv: string;
  lotte: string;
  mega: string;
  inde: string;
  home: string;
  white: string;
  hoverSeat: string;
}

interface Theme {
  $theme: string;
}

const themeColor: ThemeColorType = {
  cgv: "#E41A12",
  lotte: "#c53535",
  mega: "#3d2a76",
  inde: "#f4d322",
  home: "#007900",
  white: "#ffffff",
  hoverSeat: "rgb(105, 105, 105)",
};

export { themeColor, ThemeColorType, Theme };
