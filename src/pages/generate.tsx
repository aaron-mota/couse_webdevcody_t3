import { Box, Button, FormControl, FormControlLabel, FormHelperText, Input, InputLabel, Stack, TextField } from "@mui/material";
import { type NextPage } from "next";
import { useState } from "react";
import { PageContainer } from "~/components/mui/PageContainer";
import { api } from "~/utils/api";



const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
  })

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess: (data) => {
      console.log(data.message)
    }
  })

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    generateIcon.mutate(form)
    // generateIcon.mutate({
    //   prompt: form.prompt
    // })
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

          <TextField
            label="Prompt"
            // variant="standard"
            value={form.prompt}
            onChange={updateForm("prompt")}
            helperText="Enter a prompt to generate an icon"
          />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Stack>
      </PageContainer>
    </>
  );
};

export default GeneratePage;

