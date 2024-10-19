import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const IssueInfoBox = ({issue}: {issue: Issue}) => {
  return (
    <>
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
    </>
  )
}

export default IssueInfoBox