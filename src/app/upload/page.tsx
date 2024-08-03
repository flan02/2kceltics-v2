import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import React from 'react'

type Props = {}

const UploadPage = (props: Props) => {
  return (
    <MaxWidthWrapper className='h-[calc(100vh-60px)]'>
      <div className='border border-black h-full'>
        <h1>Upload Page</h1>
      </div>
    </MaxWidthWrapper>
  )
}

export default UploadPage