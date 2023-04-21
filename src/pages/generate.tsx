import { Box, CircularProgress, Skeleton, Stack } from "@mui/material";
import { type NextPage } from "next";
import { signIn,  useSession } from "next-auth/react";
import { useState } from "react";
import { ButtonStyled } from "~/components/mui/ButtonStyled";
import { TextFieldStyled } from "~/components/mui/TextFieldStyled.";
import { PageContainer } from "~/components/mui/PageContainer";
import { api } from "~/utils/api";
import { UserCard } from "~/components/mui/UserCard";
import Image from "next/image";



const GeneratePage: NextPage = () => {
  // GENERAL
  const session = useSession()
  const isLoggedIn = !!session.data
  

  // STATE
  const [form, setForm] = useState({prompt: "",})
  // const [imageUrl, setImageUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const [isRequesting, setIsRequesting] = useState(false)


  // DB REQUESTS
  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess: (data) => {
      console.log(data.message)
      if (data.imageUrl) {
        setImageUrl(data.imageUrl)
      }
    },
    onSettled: () => {
      setIsRequesting(false)
    }
  })


  // FUNCTIONS
  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsRequesting(true)
    generateIcon.mutate(form)
  }
  
  function updateForm(key: string) {  // NOTE:  "factory function" (returns a function)
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };
  }



  return (
    <>
      <PageContainer>
        <Stack component="form" onSubmit={handleFormSubmit}>

          <TextFieldStyled
            label="Prompt"
            value={form.prompt}
            onChange={updateForm("prompt")}
            helperText="Enter a prompt to generate an icon"
          />

          <ButtonStyled type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={isRequesting}>
            Generate icon
          </ButtonStyled>

          {!isLoggedIn ?
            <ButtonStyled onClick={() => signIn().catch(console.error)}>
              Sign in
            </ButtonStyled>
          :
            <UserCard sx={{mt: 2}} />
          }

          <Stack justifyContent="center" alignItems="center" sx={{height: 400}}>
            {isRequesting ?
                <CircularProgress />
            : imageUrl &&
              <>
                {/* <Image src={imageUrl} alt="Generated Icon" width={400} height={400} /> */}
                <Box component="img" src={imageUrl.slice(0,4) === "http" ? imageUrl : `data:image/png;base64, ${imageUrl}`} alt="Generated Icon" width={400} height={400} mt={4} />
              </>
            }
          </Stack>


        </Stack>
      </PageContainer>


    </>
  );
};

export default GeneratePage;


