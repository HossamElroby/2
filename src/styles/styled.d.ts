import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: Record<string, string>;
      secondary: Record<string, string>;
      accent: Record<string, string>;
      success: Record<string, string>;
      warning: Record<string, string>;
      error: Record<string, string>;
      neutral: Record<string, string>;
    };
    typography: {
      fontFamily: {
        primary: string;
        arabic: string;
      };
      fontSize: Record<string, string>;
      fontWeight: Record<string, number>;
    };
    spacing: Record<string, string>;
    borderRadius: Record<string, string>;
    shadows: Record<string, string>;
  }
}