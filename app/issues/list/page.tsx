import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueStatusBadge from '../../components/IssueStatusBadge';
import Link from '../../components/Link';
import IssueToggle from './IssueToggle';
import { Issue, Status } from '@prisma/client';
import NextLink from "next/link"
import { ArrowUpIcon } from '@radix-ui/react-icons';

interface Props {
  searchParams: {status: Status, orderBy: keyof Issue}
}

const IssuePage = async ({searchParams}: Props) => {

  console.log(searchParams)

  // What does Object.values do
  const statuses = Object.values(Status)
  const status =  statuses.includes(searchParams.status) ? searchParams.status : undefined

  const columns: {label: string, value: keyof Issue, className?: string }[] = [
    {label: "Issue", value: "title"},
    {label: "Status", value: "status", className: "hidden md:table-cell"},
    {label: "Created", value: "creadtedAt", className: "hidden md:table-cell"}
  ]

  const issues = await prisma.issue.findMany({
    where: {
      status
    }
  })
  return (
    <div>
      <IssueToggle />

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
              <Table.Cell className='hidden md:table-cell'><IssueStatusBadge  status={issue.status}/></Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.creadtedAt.toDateString()}</Table.Cell>
            </Table.Row>)
          }
        </Table.Body>
      </Table.Root>
    </div>
  )
}

// To disable route caching
export const dynamic = "force-dynamic"
// export const revalidate = 60

export default IssuePage