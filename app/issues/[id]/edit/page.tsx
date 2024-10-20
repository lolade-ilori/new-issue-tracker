// 'use client'

import prisma from '@/prisma/client'
import IssueFormComponent from '../_components/page'
import { notFound } from 'next/navigation'

interface Props {
    params: {id: string}
}

const EditPage = async ({params: {id}}: Props) => {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!issue) notFound()

  return (
    <IssueFormComponent issue={issue} />
  )
}

export default EditPage