import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'


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
    <div className='max-w-xl'>
        <Heading>{issue?.title}</Heading>

        <Flex my="2" gap="3" >
            <IssueStatusBadge status={issue.status} />
            <Text>{issue?.updatedAt.toDateString()}</Text>
        </Flex>

        <Card mt="5">
            <ReactMarkdown className='prose'>
                {issue?.description}
            </ReactMarkdown>
        </Card>
    </div>
  )
}

export default IssueDetailsPage