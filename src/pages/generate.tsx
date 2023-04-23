import { CircularProgress, Stack } from "@mui/material";
import { type NextPage } from "next";
import { signIn,  useSession } from "next-auth/react";
import { useState } from "react";
import { ButtonStyled } from "~/components/mui/ButtonStyled";
import { TextFieldStyled } from "~/components/mui/TextFieldStyled.";
import { PageContainer } from "~/components/mui/layout/PageContainer";
import { api } from "~/utils/api";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import { ImageWrapped } from "~/components/mui/ImageWrapped";
import { ButtonSignIn } from "~/components/mui/ButtonSignIn";


const GeneratePage: NextPage = () => {
  // GENERAL
  const session = useSession()
  const isLoggedIn = !!session.data

  // HOOKS
  const { buyCredits } = useBuyCredits()
  

  // STATE
  const [form, setForm] = useState({prompt: "",})
  // const [imageUrl, setImageUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  
  // DB REQUESTS
  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess: (data) => {
      if (data.imageUrl) {
        setImageUrl(data.imageUrl)
      }
    },
  })


  // FUNCTIONS
  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    generateIcon.mutate(form)
  }
  
  function updateForm(key: string) {  // NOTE:  "factory function" (returns a function)
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };
  }



  return (
    <>
      <PageContainer
        title="Generate"
      >

        {/* Form Area */}
        <Stack component="form" onSubmit={handleFormSubmit}>
          <TextFieldStyled
            label="Prompt"
            value={form.prompt}
            onChange={updateForm("prompt")}
            helperText="Enter a prompt to generate an icon"
          />

          <ButtonStyled type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={generateIcon.isLoading}>
            Generate icon
          </ButtonStyled>

          {!isLoggedIn ?
            <>
              <ButtonStyled onClick={() => {signIn().catch(console.error)}}>
                Sign in
              </ButtonStyled>
              {/* <ButtonStyled onClick={() => {signIn("google").catch(console.error)}}>
                Sign in with Google
              </ButtonStyled> */}
              <ButtonSignIn service="google" />
            </>
          :
            <>
              <ButtonStyled disabled={generateIcon.isLoading} onClick={() => {buyCredits().catch(console.error)}} sx={{mt: 0.5}}>Buy Credits</ButtonStyled>
            </>
          }
        </Stack>

        {/* Loading/Image Area */}
        <Stack justifyContent="center" alignItems="center" sx={{height: imageUrl && 400}}>
          {generateIcon.isLoading ?
              <CircularProgress />
          : imageUrl &&
            <>
              {/* <Image src={imageUrl} alt="Generated Icon" width={400} height={400} /> */}
              <ImageWrapped src={imageUrl} alt="Generated Icon" width={400} height={400} sx={{mt: 4}} />
            </>
          }
        </Stack>
      </PageContainer>


    </>
  );
};

export default GeneratePage;