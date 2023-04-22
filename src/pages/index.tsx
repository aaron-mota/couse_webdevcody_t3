import { Box, Grid, Stack, Typography } from "@mui/material";
import { type NextPage } from "next";
import { signIn,  useSession } from "next-auth/react";
import { ButtonStyled } from "~/components/mui/ButtonStyled";
import { PageContainer } from "~/components/mui/layout/PageContainer";
import Link from "next/link";
import { ImageWrapped } from "~/components/mui/ImageWrapped";





const Home: NextPage = () => {
  // GENERAL
  const session = useSession()
  const isLoggedIn = !!session.data

  return (
    <>
      <PageContainer>

        <Stack alignItems="center" justifyContent="center" sx={{width: 1, height: 1, px: 2}}>
          <HeroBanner />
          {/* <Link href="/generate">
            <ButtonStyled variant="contained">Go Generate an Icon</ButtonStyled>
          </Link> */}
        </Stack>




      </PageContainer>


    </>
  );
};

export default Home;


function HeroBanner() {
  return (
    <Grid container sx={{maxWidth: 1400}}>

      <Grid item xs={6}>
        <Stack justifyContent="center" alignItems="center" sx={{p: 10}}>
          <ImageWrapped src={"/banner-transparent.png"} sx={{width: 1, height: "auto"}} alt="an image of a bunch of nice looking icons" />
        </Stack>
      </Grid>

      <Grid item xs={6}>
        <Stack justifyContent="center" alignItems="start" sx={{width: 1, height: 1}}>
          <Typography variant="h2" component="h1" gutterBottom sx={{fontWeight: 500, opacity: 0.8}}>
            Generate icons with a click of a button
          </Typography>
          <Typography variant="body2" component="h2" gutterBottom sx={{fontSize: "1.4rem", opacity: 0.6}}>
            Use AI to generate icons in seconds instead of paying a designer and waiting for them to create them for you.
          </Typography>
        </Stack>
      </Grid>

    </Grid>
  )
}