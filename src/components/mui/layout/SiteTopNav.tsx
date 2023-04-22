import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


export default function SiteTopNav() {
  const router = useRouter();

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleNavigation = (href: string) => {
    router.push(href).catch(console.error);
  };
  

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={(e, newValue) => {handleChange(e, newValue as number)}} aria-label="basic tabs example">
          <Tab label="Home" onClick={() => handleNavigation("/")} />
          <Tab label="Generate Icons" onClick={() => handleNavigation("/generate")} />
        </Tabs>
      </Box>
    </Box>
  );
}
