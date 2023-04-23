
// https://mui.com/material-ui/customization/theming/ (MUI TS themeing)
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
// custom MUI theme (TS): https://stackoverflow.com/questions/64908532/extending-material-ui-theme-via-module-augmentation-not-working-correctly

import '@mui/material/styles'
import type { PaletteColorOptions } from "@mui/material";

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    }
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    }
  }



  // see IMPORTANT below (when extending Palette)
  interface Palette {
    googleSignIn: PaletteColorOptions
  }
  interface PaletteOptions {
      googleSignIn?: PaletteColorOptions
  }


}


declare module '@mui/material' {
  // IMPORTANT: if looking to use custom colors in certain components (e.g. Button), MUST also extend their props here!
  // https://stackoverflow.com/questions/72720524/typescript-react-mui-use-custom-color-on-button-component
  // ...might have to change to 'googleSignIn: true' (per comment on StackOverflow)
  interface ButtonPropsColorOverrides {
    googleSignIn,
  }
}