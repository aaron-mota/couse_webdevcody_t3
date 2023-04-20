import { Button, FormControl, FormControlLabel, Stack, TextField } from "@mui/material";
import { type NextPage } from "next";
import { useState } from "react";
import { PageContainer } from "~/components/mui/PageContainer";
import { api } from "~/utils/api";



const GeneratePage: NextPage = () => {


  const [form, setForm] = useState({
    prompt: "",
  })


  
  function updateForm(key: string) {  // NOTE:  "factory function" (returns a function)
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };
  }


  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: submit the form data to the backend
  }
  
  
  return (
    <>
      <PageContainer>
        <FormControl
          onSubmit={handleFormSubmit}
        >
          <TextField
            label="Prompt"
            value={form.prompt}
            onChange={updateForm("prompt")}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </FormControl>
      </PageContainer>
    </>
  );
};

export default GeneratePage;

