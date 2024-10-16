'use client'

import { Button, TextArea, TextField } from '@radix-ui/themes'
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string,
  description: string
}

const NewIssue = () => {
  const router = useRouter()
  const { register, handleSubmit, control, formState: { errors } } = useForm<IssueForm>();
 
  return (
    <form onSubmit={handleSubmit(async (data) => {
      await axios.post("/api/issues", data)
      router.push("/issues")
    })} 
      className='max-w-xl space-y-3'
    >
        <TextField.Root>
            <TextField.Input placeholder='Title' {...register("title", {required: true})} />
        </TextField.Root>
        {errors.title && <span>This field is required</span>}

        <Controller 
          name= "description"
          control={control}
          rules={{ required: true }}
          render={({field}) => <SimpleMDE placeholder='Description' {...field}/>}
        />
        {errors.description && <span>This field is required</span>}

        
        <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssue