import { createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";
import { RGBAToHex } from "~/utils/utils";

const defaultTheme = createTheme()

export const theme = createTheme({
    status: {
        danger: orange[500],
    },
    palette: {
        googleSignIn: {
            // Google branding guidelines: https://developers.google.com/identity/branding-guidelines

            // variant="contained"
            main: defaultTheme.palette.background.default, // consider using #fff (per branding guidelines)
            contrastText: RGBAToHex(defaultTheme.palette.text.primary) + "90",

            // variant="outlined" | variant="text"
            // main: RGBAToHex(defaultTheme.palette.text.primary) + "90",
            // contrastText: defaultTheme.palette.background.default, // consider using #fff (per branding guidelines)
        }
    }
});




