/* import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors, // ⚠️ S'assure que DefaultTheme.colors existe
    text: "#2F2F2F",
    textMuted: "#9ca3af",
    primary: "#4C4C9D",
    secondary: "#1F2732",
    error: "#ED1C24",
    maximumTrackTintColor: "rgba(255,255,255,0.4)",
    minimumTrackTintColor: "rgba(255,255,255,0.6)",
    background: '#000',
	icon: '#fff',

  },
};
export const fontSize = {
	xs: 12,
	sm: 16,
	base: 20,
	lg: 24,
}

export const screenPadding = {
	horizontal: 24,
}
export default theme; // ✅ Export par défaut
 */
import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors, // ⚠️ S'assure que DefaultTheme.colors existe
    primary: "#4C4C9D",
    secondary: "#1F2732",
    background: "#000",
    text: "#2F2F2F",
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
