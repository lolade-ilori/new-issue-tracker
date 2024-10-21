'use client'

import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading';

const IssueFormComponent = dynamic(() => import('@/app/issues/_components/page'), {
  ssr: false, // This makes sure it only loads on the client-side
  loading: () => <IssueFormSkeleton />
});

const NewIssue = () => {
 
  return (
      <IssueFormComponent />
  )
}

export default NewIssue