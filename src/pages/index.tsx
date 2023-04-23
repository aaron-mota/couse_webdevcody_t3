import { Grid, Stack, Typography } from "@mui/material";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { PageContainer } from "~/components/mui/layout/PageContainer";
import { ImageWrapped } from "~/components/mui/ImageWrapped";
// import { LinkButton } from "~/components/mui/LinkButton";
import { ButtonStyled } from "~/components/mui/ButtonStyled";






const Home: NextPage = () => {

  return (
    <>
      <PageContainer>

        <Stack alignItems="center" justifyContent="start" sx={{width: 1, height: 1, px: 2}}>
          <HeroBanner />
        </Stack>

      </PageContainer>
    </>
  );
};

export default Home;


function HeroBanner() {
  const router = useRouter();

  return (
    <Grid container sx={{maxWidth: 1400}}>

      <Grid item xs={12} md={6}>
        <Stack justifyContent="center" alignItems="center" sx={{p: {xs: 20, md: 10}, pt: {xs: 2, md: 10}}}>
          <ImageWrapped src={"/banner-transparent.png"} sx={{width: 1, height: "auto", minWidth: 400}} alt="an image of a bunch of nice looking icons" />
        </Stack>
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack justifyContent="center" alignItems="start" gap={2} sx={{width: 1, height: 1}}>
          <Stack>
            <Typography variant="h2" component="h1" gutterBottom sx={{fontWeight: 500, opacity: 0.8}}>
              Generate icons with a click of a button
            </Typography>
            <Typography variant="body2" component="h2" gutterBottom sx={{fontSize: "1.4rem", opacity: 0.6}}>
              Use AI to generate icons in seconds instead of paying a designer and waiting for them to create them for you.
            </Typography>
          </Stack>
          <ButtonStyled onClick={() => {router.push("/generate").catch(console.error)}}>
              Start Generating Icons
          </ButtonStyled>
          {/* <LinkButton href={"/generate"} >
              Start Generating Icons
          </LinkButton> */}
        </Stack>
      </Grid>

    </Grid>
  )
}