

import { auth } from '@/auth'
import Image from 'next/image'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { CornerDownLeft } from 'lucide-react'


type Props = {}

const PostComments = async () => {
  const session = await auth()


  const CommentBox = () => {
    return (
      <div className='w-full border-t border-gray-300/80'>
        <div className='flex mt-6 space-x-2'>
          <Image src={session?.user?.image!} className="rounded-full w-auto h-auto" width={60} height={48} alt='User avatar' />
          <Textarea placeholder='Add your comment...' className='caret-celtics' />

          {/* We need to create a wrapper client component to handle comment submit */}
          <Button className='self-center dark:bg-celtics hover:dark:bg-celtics/80'>
            <CornerDownLeft className="" />
          </Button>
        </div>
      </div>
    )
  }
  return (
    <div className='w-full min-h-[300px]'>
      {
        session
          ? <CommentBox />
          : <div className='text-lg w-full mt-8 font-bold text-celtics'>
            <h2 className='w-max mx-auto'>
              You must sign in to comment
            </h2>
          </div>
      }
    </div>
  )
}

export default PostComments