import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import EditIssueBtn from './EditIssueBtn'
import IssueInfoBox from './IssueInfoBox'
import DeleteIssueBtn from './DeleteIssueBtn'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'



interface Props {
    params: {id: string}
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({where: {id: issueId}}))

const IssueDetailsPage = async ({params: {id}}: Props) => {
//   if (typeof parseInt(id) !== "number") notFound()
  const session = await getServerSession(authOptions)

  const issue = await fetchUser(parseInt(id))

  if(!issue) notFound()


  return (
    <Grid columns={{initial: "1", md: "5"}} gap="5">
        <Box className='col-span-1 lg:col-span-4'>
            <IssueInfoBox issue={issue} />
        </Box>

        {
          session && 
          <Box>
            <Flex direction="column" gap="3">
                <AssigneeSelect issue={issue}/>
                <EditIssueBtn issueId={issue.id} />
                <DeleteIssueBtn issueId={issue.id} />
            </Flex>
          </Box>
        }

    </Grid>
  )
}

// To have dynamic metadata based on the title of the issue
export async function generateMetadata({params}: Props) {
  const issue = await fetchUser(parseInt(params.id))

  return {
    title: issue?.title,
    description: issue?.id
  }
}

export default IssueDetailsPage