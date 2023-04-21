import { Box, Stack } from "@mui/material";
import { type NextPage } from "next";
import { signIn,  useSession } from "next-auth/react";
import { ButtonStyled } from "~/components/mui/ButtonStyled";
import { PageContainer } from "~/components/mui/layout/PageContainer";
import Link from "next/link";



function HeroBanner() {
  // TODO: Add a hero banner
}



const Home: NextPage = () => {
  // GENERAL
  const session = useSession()
  const isLoggedIn = !!session.data

  return (
    <>
      <PageContainer>

        <Box>Hello</Box>

        {/* <Stack justifyContent={"center"} alignItems={"center"}>
          <Link href="/generate">
            <ButtonStyled variant="contained">Go Generate an Icon</ButtonStyled>
          </Link>
        </Stack> */}

      </PageContainer>


    </>
  );
};

export default Home;


