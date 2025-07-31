
import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors, // ⚠️ S'assure que DefaultTheme.colors existe
    primary: "#0C8C8CFF",
    secondary: "#0A3F3FFF",
    background:'#FFFFFF',
    text: "#1E6666FF",
    textMuted: "#9ca3af",
    icon: "#fff",
    maximumTrackTintColor: "rgba(255,255,255,0.4)",
    minimumTrackTintColor: "rgba(255,255,255,0.6)",
    error: "#ED1C24",
  },
};

export const fontSize = {
  xs: 12,
  sm: 16,
  base: 20,
  lg: 24,
};

export const screenPadding = {
  horizontal: 24,
};

export default theme;
export const colors = theme.colors;
