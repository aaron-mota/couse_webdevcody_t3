import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { Box, Stack, Typography, Tabs, Tab, colors } from "@mui/material"


export function PageNav({
  selectedNavItem,
  hidden = true,
  navItems = [],
  navState,
  setNavState = () => {},
}) {
  // console.log("navState: ", navState)



  const [value, setValue] = useState(
    selectedNavItem ? navItems.indexOf(selectedNavItem)
    : navState ? navState
    : 0
  )

  // NAV STATE
  useEffect(() => {
    setValue(navState)
  }, [navState])

  function handleChange(e, newValue) {
    // console.log("newValue:", newValue) // index
    setValue(newValue)
    setNavState(newValue)
  }
  
  return (
    <Box
      mb={2}
      display={(hidden || !navItems.length) && "none"}
      width={1}
      sx={{
        borderBottom: 1,
        // borderColor: "divider",
        borderColor: colors.grey[400],
        // boxSizing: "border-box",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        visibleScrollbar
        TabIndicatorProps={{
          sx: {
            height: 4,
            backgroundColor: "primary.light"
          }
        }}
        sx={{
          // "& button:hover": {
          //   color: "primary!important",
          //   backgroundColor: "black"
          // },
          // "& button:active": {
          //   color: "primary"
          // },
          "& .MuiButtonBase-root": {
            color: "rgba(0,0,0,.40)",
            borderBottom: 4,
            borderColor: "transparent",
            textTransform: "none",
            fontSize: "1.1rem",
            fontWeight: 400,
            py: "8px",
            // disableRipple: true,
          },
          "& .MuiButtonBase-root:hover:not(.Mui-selected)": {
            color: "rgba(0,0,0,.80)",
            borderBottom: 4,
            borderColor: (theme) => theme.palette.primary["lighter"],
            opacity: 0.6,
          },
          "& .Mui-selected": {
            // color: "neutral.dark"
            color: "rgba(0,0,0,.60)",
            fontWeight: 500,
          },
          // "& .MuiTabs-indicator": {
          //   height: "3px",
          // },
        }}
      >
        {navItems.map((navItem, i) => (
          <Tab
            key={nanoid()}
            disableRipple={true}
            label={navItem}
            {...a11yProps(i)}
          />
        ))}
      </Tabs>
    </Box>

  )
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


