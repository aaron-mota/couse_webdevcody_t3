import React, { useState } from "react"
import { nanoid } from "nanoid"
import { Box, Tabs, Tab, colors } from "@mui/material"
import { TabNavItem } from "./TabNavItem"


interface Props {
  hidden?: boolean
}


export function SiteTopNavTabs({
  hidden
}: Props) {
  const [navState, setNavState] = useState(0)

  const navItems = [
    <TabNavItem label="Home" navStateActive={0} navState={navState} docs={[]} />,
    <TabNavItem label="Generate Icons" navStateActive={1} navState={navState} docs={[]} />,
  ]


  function handleChange(e: React.ChangeEvent<{}>, newValue: number) {
    // gets tab index from ChangeEvent
    setNavState(newValue)
  }

  if (hidden) {
    return null
  }
  
  return (
    <Box
      mb={2}
      width={1}
      sx={{
        // borderBottom: 1,
        // borderColor: colors.grey[400],
      }}
    >
      <Tabs
        value={navState}
        onChange={handleChange}
        visibleScrollbar
        TabIndicatorProps={{
          sx: {
            height: 4,
            backgroundColor: "primary.main"
          }
        }}
        sx={{
          mt: 0.5,

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
            fontSize: "1rem",
            fontWeight: 400,
            py: "8px",
            // disableRipple: true,
          },
          "& .MuiButtonBase-root:hover:not(.Mui-selected)": {
            color: "rgba(0,0,0,.80)",
            borderBottom: 4,
            borderColor: (theme) => theme.palette.primary["main"],
            opacity: 0.6,
          },
          "& .Mui-selected": {
            // color: "neutral.dark"
            color: "rgba(0,0,0,.60)",
            fontWeight: 400,
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



function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


