import { createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";

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



function RGBAToHex(rgba: string, forceRemoveAlpha = false) {
    let hexValue = "#" + rgba
        .replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
        .split(',') // splits them at ","
        .filter((string, index) => !forceRemoveAlpha || index !== 3)
        .map(string => parseFloat(string)) // Converts them to numbers
        .map((number, index) => index === 3 ? Math.round(number * 255) : number) // Converts alpha to 255 number
        .map(number => number.toString(16)) // Converts numbers to hex
        .map(string => string.length === 1 ? "0" + string : string) // Adds 0 when length of one number is 1
        .join("") // Puts the array to togehter to a string
    if (hexValue.length === 9) {
        hexValue = hexValue.slice(0, 7) // Removes alpha value
    }
    return hexValue
}
function RGBAToHexA(rgba: string, forceRemoveAlpha = false) {
    let hexValue = "#" + rgba
        .replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
        .split(',') // splits them at ","
        .filter((string, index) => !forceRemoveAlpha || index !== 3)
        .map(string => parseFloat(string)) // Converts them to numbers
        .map((number, index) => index === 3 ? Math.round(number * 255) : number) // Converts alpha to 255 number
        .map(number => number.toString(16)) // Converts numbers to hex
        .map(string => string.length === 1 ? "0" + string : string) // Adds 0 when length of one number is 1
        .join("") // Puts the array to togehter to a string
    return hexValue
}

// //
// // Only tests below! Click "Run code snippet" to see results
// //

// // RGBA with Alpha value
// expect(RGBAToHexA("rgba(255, 255, 255, 0)"), "#ffffff00")
// expect(RGBAToHexA("rgba(0, 0, 0, 0)"), "#00000000")
// expect(RGBAToHexA("rgba(124, 255, 3, 0.5)"), "#7cff0380")
// expect(RGBAToHexA("rgba(124, 255, 3, 1)"), "#7cff03ff")

// // RGB value 
// expect(RGBAToHexA("rgba(255, 255, 255)"), "#ffffff")
// expect(RGBAToHexA("rgba(0, 0, 0)"), "#000000")
// expect(RGBAToHexA("rgba(124, 255, 3)"), "#7cff03")

// // RGBA without Alpha value
// expect(RGBAToHexA("rgba(255, 255, 255, 0)", true), "#ffffff")
// expect(RGBAToHexA("rgba(0, 0, 0, 0)", true), "#000000")
// expect(RGBAToHexA("rgba(124, 255, 3, 0.5)", true), "#7cff03")
// expect(RGBAToHexA("rgba(124, 255, 3, 1)", true), "#7cff03")

// function expect(result: string, expectation: string) {
// console.log(result === expectation ? "✓" : "X", result, expectation)
// }