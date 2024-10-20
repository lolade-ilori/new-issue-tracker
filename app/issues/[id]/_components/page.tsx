'use client'

import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import createIssuesSchema from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import 'easymde/dist/easymde.min.css'
import { Issue } from '@prisma/client'
import { Callout, TextField, Button } from '@radix-ui/themes'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { BsInfoCircle } from 'react-icons/bs'
import { z } from 'zod'

// Use dynamic import to lazy load the MarkdownEditor component
  const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false, // This makes sure it only loads on the client-side
  });
  
  // Letting zod infer this type (IssueForm) based on the schema
  type IssueForm = z.infer<typeof createIssuesSchema>; 

  const IssueFormComponent = ({issue}: {issue?: Issue}) => {
    const router = useRouter()
    const { register, handleSubmit, control, formState: { errors } } = useForm<IssueForm>({
      resolver: zodResolver(createIssuesSchema)
    });
  
    const [error, setError] = useState("")
    const [isSubmitting, setSubmitting] = useState(false)
  
    const onSubmit = handleSubmit(async (data) => {
      try {
        setSubmitting(true)
        await axios.post("/api/issues", data)
        router.push("/issues")
      } catch (error) {
        setError("An unexpected error occured")
        setSubmitting(false)
      }
    })


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
      <form onSubmit={onSubmit} 
        className='space-y-3'
      >
          <TextField.Root>
              <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register("title", {required: true})} />
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>

          <Controller 
            name= "description"
            control={control}
            defaultValue={issue?.description} 
            rules={{ required: true }}
            render={({field}) => <SimpleMDE placeholder='Description' {...field}/>}
          />
          <ErrorMessage >{errors.description?.message}</ErrorMessage>

          
          <Button disabled={isSubmitting}>Submit New Issue { isSubmitting && <Spinner /> }</Button>
      </form>
    </div>
  )
}

export default IssueFormComponent