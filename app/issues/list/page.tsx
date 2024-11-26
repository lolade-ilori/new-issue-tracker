import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueStatusBadge from '../../components/IssueStatusBadge';
import Link from '../../components/Link';
import IssueToggle from './IssueToggle';
import { Issue, Status } from '@prisma/client';
import NextLink from "next/link"
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/app/components/Pagination';

interface Props {
  searchParams: {status: Status, orderBy: keyof Issue, page: string}
}

const IssuePage = async ({searchParams}: Props) => {


  // What does Object.values do
  const statuses = Object.values(Status)
  const status =  statuses.includes(searchParams.status) ? searchParams.status : undefined
  const where = {status}

  const columns: {label: string, value: keyof Issue, className?: string }[] = [
    {label: "Issue", value: "title"},
    {label: "Status", value: "status", className: "hidden md:table-cell"},
    {label: "Created", value: "creadtedAt", className: "hidden md:table-cell"}
  ]

  // mapping the array of columns to an array of strings, so it becomes an array of strings calling the include function to check if the searchparams.orderBy value is in the array of strings, then return either the value or undefined
  const orderBy = columns
    .map(column => column.value).includes(searchParams.orderBy) 
    ? {[searchParams.orderBy]: 'asc'} : undefined
  
  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,//This gives the number of records we should skip
    take: pageSize //This is the number of records we want to fetch, NB: with skip and take query, we will get the issues for a given page
  })

  //To also get the total number of issues
  const issueCount = await prisma.issue.count({where}) 


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
              <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status}/></Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.creadtedAt.toDateString()}</Table.Cell>
            </Table.Row>)
          }
        </Table.Body>
      </Table.Root>
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
    </div>
  )
}

// To disable route caching
export const dynamic = "force-dynamic"
// export const revalidate = 60

export default IssuePage

// OUR PAGES SHOULD HAVE A SINGLE RESPOSNIBILTY, AND THAT IS LAYING OUT OUR COMPONENTS