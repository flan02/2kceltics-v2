import { LoaderCircle } from 'lucide-react'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className='m-auto w-max'>

      <LoaderCircle className='animate-spin' size={36} />
    </div>
  )
}

export default Loading