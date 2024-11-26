import React from 'react'
import { Table } from '@radix-ui/themes';
import NextLink from "next/link"
import IssueStatusBadge from '../../components/IssueStatusBadge';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Link from '../../components/Link';
import { Issue, Status } from '@prisma/client';

export interface QueryProps {
    status: Status, orderBy: keyof Issue, page: string
}

interface Props {
   searchParams: QueryProps,
   issues: Issue[]
}

const IssueTable = ({searchParams, issues}: Props) => {

  return (
    <Table.Root variant='surface'>
        <Table.Header>
        <Table.Row>
            {
            columns.map(column => (
                <Table.ColumnHeaderCell key={column.value} className={column.className}>
                    <NextLink href={{
                        query: {...searchParams, orderBy: column.value}
                    }}>
                        {column.label}
                    </NextLink>
                    {
                        column.value === searchParams.orderBy && <ArrowUpIcon className='inline' />
                    }
                
                </Table.ColumnHeaderCell>
            ))
            }
        </Table.Row>
        </Table.Header>

        <Table.Body>
        {
            issues.map((issue) => 
                <Table.Row key={issue.id}>
                    <Table.Cell>
                        <Link href={`/issues/${issue.id}`} label={issue.title} />
                        
                        <div className='block md:hidden'>
                        <IssueStatusBadge  status={issue.status}/>
                        </div>
                    </Table.Cell>
                    <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status}/></Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>{issue.creadtedAt.toDateString()}</Table.Cell>
                </Table.Row>
            )
        }
        </Table.Body>
    </Table.Root>
  )
}

const columns: {label: string, value: keyof Issue, className?: string }[] = [
    {label: "Issue", value: "title"},
    {label: "Status", value: "status", className: "hidden md:table-cell"},
    {label: "Created", value: "creadtedAt", className: "hidden md:table-cell"}
]

export const columnValue = columns.map(column => column.value)

export default IssueTable