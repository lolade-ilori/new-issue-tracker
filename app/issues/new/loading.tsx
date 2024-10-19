import { Card } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const NewPageLoader = () => {
  return (
    <div className='max-w-xl'>
        <Skeleton height={25} />

        <Skeleton height={40} />
    </div>
  )
}

export default NewPageLoader