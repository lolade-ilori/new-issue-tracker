'use client'

import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { zodResolver } from '@hookform/resolvers/zod';
import createIssuesSchema from '@/app/validationSchema';
import { z } from 'zod';

// Letting zod infer this type (IssueForm) based on the schema
type IssueForm = z.infer<typeof createIssuesSchema>; 

const NewIssue = () => {
  const router = useRouter()
  const { register, handleSubmit, control, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssuesSchema)
  });

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
              <TextField.Input placeholder='Title' {...register("title", {required: true})} />
          </TextField.Root>
          {errors.title && <Text color='red' as='p'>This field is required</Text>}

          <Controller 
            name= "description"
            control={control}
            rules={{ required: true }}
            render={({field}) => <SimpleMDE placeholder='Description' {...field}/>}
          />
          {errors.description && <Text color='red' as='p'>This field is required</Text>}

          
          <Button>Submit New Issue</Button>
      </form>
    </div>

  )
}

export default NewIssue