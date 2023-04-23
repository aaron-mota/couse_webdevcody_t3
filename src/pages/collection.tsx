import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { type NextPage } from "next";
import { PageContainer } from "~/components/mui/layout/PageContainer";
import { api } from "~/utils/api";
import { ImageWrapped } from "~/components/mui/ImageWrapped";
import type { Icon } from "@prisma/client";
import { useEffect } from "react";
import { Box } from "@mui/material";



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
          { icons.isLoading ?
              <CircularProgress />
          : icons.data?.map((icon: Icon) => {
              // const imageUrl = `https://${env.S3_BUCKET_NAME}.s3.${env.S3_REGION}.amazonaws.com/${icon.id}`
              const imageUrl = `https://course-webdevcody-t3-2.s3.us-east-2.amazonaws.com/${icon.id}`
              return (
                <Paper elevation={4}>
                  <ImageWrapped key={icon.id} src={imageUrl} alt={icon.prompt} width={200} height={200} />
                </Paper>
              )
            })
          }
        </Stack>
      </PageContainer>


    </>
  );
};

export default Collection;