
// https://mui.com/material-ui/customization/theming/ (MUI TS themeing)
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation

// custom MUI theme (TS): https://stackoverflow.com/questions/64908532/extending-material-ui-theme-via-module-augmentation-not-working-correctly

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
