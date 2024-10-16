'use client'

import { Button, Callout, TextArea, TextField } from '@radix-ui/themes'
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';

interface IssueForm {
  title: string,
  description: string
}

const NewIssue = () => {
  const router = useRouter()
  const { register, handleSubmit, control, formState: { errors } } = useForm<IssueForm>();

  const [error, setError] = useState("")
 
  return (

    <div className='max-w-xl'>
      {error && 
        <Callout.Root color='red' className='mb-5'>
          <Callout.Icon>
            <BsInfoCircle />
          </Callout.Icon>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      }
      <form onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post("/api/issues", data)
          router.push("/issues")
        } catch (error) {
          setError("An unexpected error occured")
        }
      })} 
        className='space-y-3'
      >
          <TextField.Root>
              <TextField.Input placeholder='Title' {...register("title", {required: false})} />
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
    </div>

  )
}

export default NewIssue