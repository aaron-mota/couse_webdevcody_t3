import { CircularProgress, Stack } from "@mui/material";
import { type NextPage } from "next";
import { signIn,  useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ButtonStyled } from "~/components/mui/ButtonStyled";
import { TextFieldStyled } from "~/components/mui/TextFieldStyled.";
import { PageContainer } from "~/components/mui/layout/PageContainer";
import { api } from "~/utils/api";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import { ButtonSignIn } from "~/components/mui/ButtonSignIn";
import IconApp from "~/components/mui/app/IconApp";
import { useForm } from "react-hook-form";


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


  // REACT HOOK FORM
  // form basics (research-based):  https://medium.com/@carolinalina/the-ultimate-guide-for-form-design-the-perfect-form-acea20367ed1
  // unique multiselect forms (e.g. combination of autocomplete + filtering pill cloud; sectioned area checkboxes): https://medium.com/tripaneer-techblog/improving-the-usability-of-multi-selecting-from-a-long-list-63e1a67aab35
  type FormValues = {
    first: string,
    last: string,
    age: number | string,
    // ...
  }


  // STILL TO GO OVER: (https://react-hook-form.com/api/)
  // useForm (Form)
  // useController, (Controller)
  // useFormContext, (FormProvider)
  // useWatch 
  // useFormState, (ErrorMessage)
  // useFieldArray

  const {
    register,
    handleSubmit,
    watch, // "subscribe" React to form (rerender when input changes) (behaves like controlled form) (e.g. display something based on a certain input)
    // reset, // set to empty/defaultValues, keep dirty state, etc,.
      // vs setValue: more for complete/bulk form updates (vs setValue more for individual form updates), and will WIPE FORM STATE (vs setValue will NOT wipe away form state) (e.g. dirty, touched, etc,.)
      // MOST IMPORTANT:  DO NOT try to use reset() within onSubmit -- form state can get wacky (instead, call it in useEffect with [formState.isSubmitSuccessful (or formState), reset] dependency array, then if (formState.isSubmitSuccessful) {reset()} )
      // IMPORTANT: when setting values in reset (vs defaultValues), it will UPDATE defaultValues for hook next render (so, if you want to reset to defaultValues, use reset({defaultValues: {...}}) ) (https://youtu.be/qmCLBjyPwVk?t=149)
      // however, can use options ({ keepDefaultValues: true} ) to prevent this

      // values, // values of form (e.g. values.first )
      // keepErrors, // keep errors when resetting form (e.g. reset({keepErrors: true}) )
      // keepDirty, // keep dirty state when resetting form (e.g. reset({keepDirty: true}) )
      // keepValues, // keep values when resetting form (e.g. reset({keepValues: true}) ) (reset everything else (e.g. errors, dirty, etc,.))
      // keepDefaultValues, // keep defaultValues when resetting form (e.g. reset({keepDefaultValues: true}) )
      // keepIsSubmitted, // keep isSubmitted when resetting form (e.g. reset({keepIsSubmitted: true}) )
      // keepTouched, // keep touched state when resetting form (e.g. reset({keepTouched: true}) )
      // keepIsValid, // keep isValid state when resetting form (e.g. reset({keepIsValid: true}) )
      // keepSubmitCount, // keep submitCount state when resetting form (e.g. reset({keepSubmitCount: true}) )
    // resetField, // reset specific input (e.g. resetField("first") )
      // keepError, keepDirty, keepTouched, ...defaultValue
    // getValues, // get values of entire form (e.g. getValues() ) (or, getValues({nest: true}) to get nested values)
      // can but used in conjunction with reset to do "partial resets" (e.g. reset({...getValues(), first: "John"}) )
    // trigger, // trigger validation for specific input(s) (e.g. trigger("first") )
        // shouldFocus, // focus on first input with error (e.g. trigger("first", {shouldFocus: true}) )
    // setValue, // programmatically set value of input (e.g. setValue("first", "John", options) ) (e.g. click button to programmatically set value)
    // setError, // programmatically set error for specific input(s) (e.g. setError("first", {type: "manual", message: "Invalid"}) )
        // set custom error (e.g. setting error (1) outside of validation rule, or (2) coming from a service)
        // multiple error values assigned to input (https://youtu.be/raMqvE0YyIY?t=186)
    // clearErrors, // clear errors for specific input(s) (e.g. clearErrors("first") )
    
    // register, // register input (e.g. register("first") ) (track input)
    // unregister, // unregister input (e.g. unregister("first") ) (untrack input)
      // used in conjunction with shoudUnregister, and a useEffect to unregister inputs when component unmounts (https://youtu.be/TM99g_NW5Gk)


    // handleSubmit, // submit form (e.g. handleSubmit(onSubmit) ) (interesting... wrong your normal onSubmit function in handleSubmit -- handleSubmit(onSubmit, on Error) -- then, no need to call e.preventDefault (e no longer being passed in, but "data" is))  (https://youtu.be/KzcPKB9SOEk)
      // TS: data: FormValues (type usd for useForm<FormValues>(...))
      // if {disabled: true} option set for an input, will be "undefined" in data
      // ...serverside error catching (/ validation ?) (https://youtu.be/KzcPKB9SOEk)

    formState: { 
      // isDirty, // if using valueAsNumber, must allow Type of field to be string | number (but also, when input deleted to nothing, it still things it is dirty... maybe avoid valueAsNumber, if isDirty/dirtyFields is important) (or, use number defaultValue ?)
      // isValid (requires useForm({mode: "onChange"})) (when subscribing to entire form isValid or not, really asking entire form to be checked on every input change))
      // dirtyFields, touchedFields, isSubmitted, isSubmitSuccessful, isSubmitting, submitCount, isValid, isValidating
      errors,
    }
  } = useForm<FormValues>({
    defaultValues: {
      first: "",
      last: "",
      age: "",
    },
    // https://react-hook-form.com/api/useform/#props
    // mode: "onChange", // default is "onSubmit" (https://youtu.be/KzcPKB9SOEk)
      // onBlur, onChange, onSubmit,...
    // reValidateMode: "onChange", // default is "onChange" (https://youtu.be/KzcPKB9SOEk)
    // values, // reactive values to update the form values
    // resetOptions: {keepDefaultValues: true}, // reset options (e.g. keepDefaultValues, keepValues, keepErrors, keepDirty, keepIsSubmitted, keepTouched, keepIsValid, keepSubmitCount)
    // criteriaMode: "firstError", // display first error (default is "all")
    // shouldFocusError: true, // focus on first input with error (default is false)
    // delayError: 1000, // delay error (default is 0)
    // shouldUseNativeValidation: false, // default is false (use browser built-in form constraint API)
    // shouldUnregister: true, // default is false (e.g. unregister input when unmounted, such as displaying input conditionally (e.g. show input if checkbox checked)) (https://youtu.be/TM99g_NW5Gk)

    // SCHEMA VALIDATIN PROPS
    // resolver: zodResolver(schema), // (https://youtu.be/PGqbe3TDlrE)
    // context
    

  })
  // useController, // useController is used to control a custom component (e.g. useController({name: "first", control})); in his video, he explained that it shows how things work under the hood in RHF (...maybe not actually used normally?)
    // IMPORTANT: use this for integrating with controlled UI component libraries (e.g MUI, ...) (https://react-hook-form.com/get-started/) (https://blog.logrocket.com/using-material-ui-with-react-hook-form/)
    // IMPORTANT IMPORTANT:  MUI library (https://github.com/adiathasan/mui-react-hook-form-plus)
    // MutliValue/MultiSelect Autocomplete: https://mui-react-hook-form-plus.vercel.app/?path=/docs/hookautocomplete-%E2%8C%A8--hookautocomplete-%F0%9F%9B%AB
  // useWatch, // used with useController above (in video explaining how things worked under the hood in RHF)
  // useFieldArray, // used to control array of inputs (e.g. useFieldArray({control, name: "first"}) )
    // can be used for appending, prepending, inserting, removing, moving, swapping, and resetting array of inputs (https://youtu.be/4MrbfGSFY2A)
  // useFormState
  // useFormContext


  // const firstName = watch("first") // subscribe to only desired input(s)
  const [first, last] = watch(["first", "last"]) // subscribe to only desired input(s)

  console.log(errors)

  // // subscribe to entire form, see what's happening without rerenders
  // useEffect(() => {
  //   const subscription = watch((data) => {
  //     console.log(data)
  //   })
  //   return () => subscription.unsubscribe()
  // }, [watch])



  // const onSubmit = async (data) => {
  //   await sleep(30000)
  // }


  return (
    <>
      <PageContainer
        title="Generate"
      >
        {/* Form Area (React Hook Form) */}
        {/* <form onSubmit={handleSubmit((data) => {
          console.log(data)
        })}>
          <input {...register("first", { required: "This is required." })} placeholder="First" />
          <p>{first}</p>
          <p>{errors.first?.message}</p>

          <input
            placeholder="Last"
            {...register(
              "last",
              {
                required: "This is required.",
                minLength: {
                  value: 4,
                  message: "Minimum length is 4."
                },
                validate: (value) => value === "Motacek" || "Last name must be Motacek."
              }
            )} 
          />
          <p>{errors.last?.message}</p>

          <input {...register("age", {
            required: "This is required.",
            valueAsNumber: true,
          })} placeholder="Age" />
          <p>{errors.age?.message}</p>

          <input type="submit" />
        </form> */}


        {/* <Stack component="form" onSubmit={handleFormSubmit}>
          <TextFieldStyled
            label="Prompt"
            value={form.prompt}
            onChange={updateForm("prompt")}
            helperText="Enter a prompt to generate an icon"
          />

          <ButtonStyled type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={generateIcon.isLoading}>
            Generate image
          </ButtonStyled>

          {!isLoggedIn ?
            <>
              <ButtonStyled onClick={() => {signIn().catch(console.error)}}>
                Sign in
              </ButtonStyled>
              <ButtonSignIn service="google" />
            </>
          :
            <>
              <ButtonStyled disabled={generateIcon.isLoading} onClick={() => {buyCredits().catch(console.error)}} sx={{mt: 0.5}}>Buy Credits</ButtonStyled>
            </>
          }
        </Stack> */}


        {/* Loading/Image Area */}
        <Stack justifyContent="center" alignItems="center" sx={{height: imageUrl && 400}}>
          {generateIcon.isLoading ?
            <CircularProgress />
          : imageUrl &&
            <IconApp imageUrl={imageUrl} />
          }
        </Stack>
      </PageContainer>


    </>
  );
};

export default GeneratePage;