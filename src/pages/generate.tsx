import { Stack } from "@mui/material";
import { type NextPage } from "next";
import { signIn,  useSession } from "next-auth/react";
import { useState } from "react";
import { ButtonStyled } from "~/components/mui/ButtonStyled";
import { TextFieldStyled } from "~/components/mui/TextFieldStyled.";
import { PageContainer } from "~/components/mui/PageContainer";
import { api } from "~/utils/api";
import { UserCard } from "~/components/mui/UserCard";



const GeneratePage: NextPage = () => {
  // GENERAL
  const session = useSession()
  const isLoggedIn = !!session.data
  

  // STATE
  const [form, setForm] = useState({prompt: "",})


  // DB REQUESTS
  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess: (data) => {
      console.log(data.message)
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
            Submit
          </ButtonStyled>

          {!isLoggedIn ?
            <ButtonStyled onClick={() => signIn().catch(console.error)}>
              Sign in
            </ButtonStyled>
          :
            <UserCard sx={{mt: 2}} />
          }

        </Stack>
      </PageContainer>


    </>
  );
};

export default GeneratePage;


