import { Card} from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const IssueDetailsLoadingPage = () => {
  return (
    <div className='max-w-xl'>
        <Skeleton height={40}/>

        <Skeleton height={25} />

        <Card mt="5">
            <Skeleton count={5}/>
        </Card>
    </div>
  )
}

export default IssueDetailsLoadingPage