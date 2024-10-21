import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const IssueFormSkeleton = () => {
  return (
    <div className='max-w-xl'>
        <Skeleton height={25} />

        <Skeleton height={350} className='mt-3' />
    </div>
  )
}

export default IssueFormSkeleton