import prisma from '@/prisma/client';
import IssueToggle from './IssueToggle';
import { Issue, Status } from '@prisma/client';
import Pagination from '@/app/components/Pagination';
import IssueTable, { columnValue, QueryProps } from './IssueTable';
import { Flex } from '@radix-ui/themes';

interface Props {
  searchParams: QueryProps
}

const IssuePage = async ({searchParams}: Props) => {
  // What does Object.values do
  const statuses = Object.values(Status)
  const status =  statuses.includes(searchParams.status) ? searchParams.status : undefined
  const where = {status}

  // mapping the array of columns to an array of strings, so it becomes an array of strings calling the include function to check if the searchparams.orderBy value is in the array of strings, then return either the value or undefined - Thiswas before Refactoring but still follows the same idea...
  const orderBy = columnValue
    .includes(searchParams.orderBy) 
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
    <Flex direction="column" gap="3">
      <IssueToggle />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>

    </Flex>
  )
}

// To disable route caching
export const dynamic = "force-dynamic"
// export const revalidate = 60

export default IssuePage

// OUR PAGES SHOULD HAVE A SINGLE RESPOSNIBILTY, AND THAT IS LAYING OUT OUR COMPONENTS - SINGLE RESPONSIBILITY PRINCIPLE