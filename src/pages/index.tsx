import { Stack } from "@mui/material";
import { type NextPage } from "next";
import { signIn,  useSession } from "next-auth/react";
import { ButtonStyled } from "~/components/mui/ButtonStyled";
import { PageContainer } from "~/components/mui/PageContainer";
import Link from "next/link";


const Home: NextPage = () => {
  // GENERAL
  const session = useSession()
  const isLoggedIn = !!session.data

  return (
    <>
      <PageContainer>

        <Stack justifyContent={"center"} alignItems={"center"}>
          <Link href="/generate">
            <ButtonStyled variant="contained">Go Generate an Icon</ButtonStyled>
          </Link>

        </Stack>

      </PageContainer>


    </>
  );
};

export default Home;


