import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusBadge from './components/IssueStatusBadge'

const LatestIssue = async () => {

    const issues = await prisma.issue.findMany({
        orderBy: {creadtedAt : 'desc'},
        take: 5,
        include: {
            assignedUser: true // this technique is called eager loading, so now we are fethcing the  issues with the user they are assigned to
        }
    })

  return (
    <Card>
        <Heading size="4" mb="5">Latest Issues</Heading>
        <Table.Root>
            <Table.Body>
                {
                    issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Flex justify="between">
                                    <Flex direction="column" gap="2" align="start">
                                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                        <IssueStatusBadge status={issue.status}/>
                                    </Flex>

                                    {
                                        issue.assignedUser && (
                                            <Avatar src={issue.assignedUser.image!} fallback="?" size="2" radius='full'/>
                                        )
                                    }
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>
        </Table.Root>
    </Card>
  )
}

export default LatestIssue