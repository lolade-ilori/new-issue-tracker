// 'use client'

import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from '../../new/loading';

const IssueFormComponent = dynamic(() => import('@/app/issues/_components/page'), {
    ssr: false, // This makes sure it only loads on the client-side
    loading: () => <IssueFormSkeleton />
  });

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