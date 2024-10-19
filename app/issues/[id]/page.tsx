import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import {Pencil2Icon} from "@radix-ui/react-icons"
import Link from 'next/link'
import EditIssueBtn from './EditIssueBtn'
import IssueInfoBox from './IssueInfoBox'



interface Props {
    params: {id: string}
}

const IssueDetailsPage = async ({params: {id}}: Props) => {
//   if (typeof parseInt(id) !== "number") notFound()

  const issue = await prisma.issue.findUnique({
    where: {
        id: parseInt(id)
    }
  })

  if(!issue) notFound()

  await delay(1000)

  return (
    <Grid columns={{initial: "1", sm: "2"}} gap="5">
        <Box>
            <IssueInfoBox issue={issue} />
        </Box>

        <Box>
            <EditIssueBtn issueId={issue.id} />
        </Box>

    </Grid>
  )
}

export default IssueDetailsPage