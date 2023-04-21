import React from "react"
import { Stack } from "@mui/material"
import { Chip } from "@mui/material"


interface TabNavItemProps {
  label: string;
  navStateActive: number;
  navState: number;
  docs: any[];
  onClick?: () => void;
}

export function TabNavItem({
  label,
  navStateActive,
  navState,
  docs = [],
  onClick,
}: TabNavItemProps) {
  
  if (docs.length > 0) {
    return (
      <Stack
        onClick={onClick}
        direction="row"
        gap={0.5}
        justifyContent="center"
        alignItems="center"
        sx={{
          fontSize: "1.1rem",
          fontWeight: navState == navStateActive ? 600 : "inherit"
        }}
      >
        {label}
        <ChipNavItem navStateActive={navStateActive} navState={navState} docs={docs} />
      </Stack>
    )
  }

  return (
    <>
      <Stack
        onClick={onClick}
        direction="row"
        gap={0.5}
        justifyContent="center"
        alignItems="center"
        sx={{
          fontSize: "1.1rem",
          fontWeight: navState == navStateActive ? 600 : "inherit"
        }}
      >
        {label}
      </Stack>
    </>
  )
}


interface ChipNavItemProps {
  navStateActive: number;
  navState: number;
  docs: any[];
  color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | undefined;
}


export function ChipNavItem({
  navStateActive,
  navState,
  docs,
  color
}: ChipNavItemProps) {
  return (
    <>
      <Chip size="small" label={docs.length} color={color ? color : navState == navStateActive ? "primary" : "default"} sx={{fontWeight: 400, opacity: 0.8}}/>
    </>
  )
}
