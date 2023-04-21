import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@mui/material";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SiteHeader from "~/components/mui/layout/SiteHeader";
import SiteTopNav from "~/components/mui/layout/SiteTopNav";


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      {/* <ThemeProvider theme={theme}> */}
        <CssBaseline />

        <Component {...pageProps} />

      {/* </ThemeProvider> */}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
