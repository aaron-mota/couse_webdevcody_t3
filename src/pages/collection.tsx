import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { type NextPage } from "next";
import { PageContainer } from "~/components/mui/layout/PageContainer";
import { api } from "~/utils/api";
import { ImageWrapped } from "~/components/mui/ImageWrapped";
import type { Icon } from "@prisma/client";
import { useEffect } from "react";
import { Box } from "@mui/material";
import IconApp from "~/components/mui/app/IconApp";



const Collection: NextPage = () => {
  // GENERAL
  // const session = useSession()
  // const isLoggedIn = !!session.data
  
  // DB REQUESTS
  const icons = api.icons.getIcons.useQuery()


  // TODO:  convert to onSuccess/onSettled (tRPC) (vs useEffect)
  useEffect(() => {
    console.log("icons.data", icons.data)
  }, [icons.data, icons.data?.length])



  return (
    <>
      <PageContainer
        title="Collection"
      >

        <Typography variant="h4" sx={{mb:6}}>Your Icons</Typography>
      
        {/* Loading/Image Area */}
        <Stack direction="row" gap={2} sx={{maxWidth: 1000, flexWrap: "wrap"}}>
          {icons.isLoading ?
            <CircularProgress />
          : icons.data?.map((icon: Icon) =>
            <IconApp icon={icon} />
          )}
        </Stack>
      </PageContainer>


    </>
  );
};

export default Collection;