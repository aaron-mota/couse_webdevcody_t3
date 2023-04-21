import { Box, Stack } from "@mui/material";
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
  const [imageUrl, setImageUrl] = useState("https://oaidalleapiprodscus.blob.core.windows.net/private/org-Dn8Ri870V3bP0oUj9Pa2Ubzc/user-BdPKFI7jGX3NnMivlecm4oYz/img-2Xbw5RQbtxKszg7U1mXu8YMO.png?st=2023-04-21T03%3A34%3A10Z&se=2023-04-21T05%3A34%3A10Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-20T22%3A58%3A57Z&ske=2023-04-21T22%3A58%3A57Z&sks=b&skv=2021-08-06&sig=9rH8e6j9LjmODl5Ig9IMB6euyGbSmLUDs7LOU01dUVw%3D")


  // DB REQUESTS
  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess: (data) => {
      console.log(data.message)
      if (data.imageUrl) {
        setImageUrl(data.imageUrl)
      }
    }
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
      <PageContainer>
        <Stack component="form" onSubmit={handleFormSubmit}>

          <TextFieldStyled
            label="Prompt"
            value={form.prompt}
            onChange={updateForm("prompt")}
            helperText="Enter a prompt to generate an icon"
          />

          <ButtonStyled type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Generate icon
          </ButtonStyled>

          {!isLoggedIn ?
            <ButtonStyled onClick={() => signIn().catch(console.error)}>
              Sign in
            </ButtonStyled>
          :
            <UserCard sx={{mt: 2}} />
          }

          {imageUrl && 
            // <Image alt="Generated Icon" src={imageUrl} width={400} height={400} />
            <Box component="img" src={imageUrl} alt="Generated Icon" width={400} height="auto" mt={4} />
          }

        </Stack>
      </PageContainer>


    </>
  );
};

export default GeneratePage;


