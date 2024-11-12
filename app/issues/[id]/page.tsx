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



interface Props {
    params: {id: string}
}

const IssueDetailsPage = async ({params: {id}}: Props) => {
//   if (typeof parseInt(id) !== "number") notFound()
  const session = await getServerSession(authOptions)

  const issue = await prisma.issue.findUnique({
    where: {
        id: parseInt(id)
    }
  })

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
                <AssigneeSelect />
                <EditIssueBtn issueId={issue.id} />
                <DeleteIssueBtn issueId={issue.id} />
            </Flex>
          </Box>
        }

    </Grid>
  )
}

export default IssueDetailsPage