import React, { useState } from "react"
import { nanoid } from "nanoid"
import { Box, Tabs, Tab } from "@mui/material"
import { TabNavItem } from "./TabNavItem"

interface Props {
  hidden?: boolean
}


// NOT QUITE WORKING...

export function SiteTopNavTabs({
  hidden
}: Props) {

  const navItemProperties = [
    {
      label: "Home",
      path: "/",
      docs: [],
    },
    {
      label: "Generate Icons",
      path: "/generate",
      docs: [],
    },
  ]

  const [navState, setNavState] = useState(0)
  const [navItems] = useState(navItemProperties.map(({label, docs}, i) => <TabNavItem key={label} label={label} navStateActive={navState} navState={i} docs={docs} />))

  // useEffect(() => {
  //   if (navItems.length > 0) {
  //     console.log("navState", navState)
  //     console.log("pathName", pathName)
  //     const newPath = navItemProperties[navState]!.path
  //     if (pathName != newPath) {
  //       handleNavigate(newPath)
  //     }
  //   }
  // }, [navState])

  // async function handleNavigate(path: string) {
  //   router.push(path)
  // }

  function handleChange(e: React.SyntheticEvent<Element, Event>, newValue: number) {
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
        onChange={(e, newValue) => handleChange(e, newValue as number)}
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


