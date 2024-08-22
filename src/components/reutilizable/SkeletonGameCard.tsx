
import { Skeleton } from '@/components/ui/skeleton';
type Props = {}

const SkeletonGameCard = (props: Props) => {
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  return (
    <>
      {
        skeleton.map((item, index) => (
          <Skeleton className="flex flex-col items-end w-full md:w-[290px] lg:w-[330px] h-[274.5px] rounded-xl" key={index} >
            <Skeleton className='w-full h-[500px] rounded-t-xl' />
            <div className='flex items-end pb-4 justify-around w-full h-full'>
              <div className='flex justify-evenly w-full'>
                <Skeleton className='flex items-end size-16 rounded-full' />
                <Skeleton className='flex self-center size-4' />
                <Skeleton className='flex items-end size-16 rounded-full' />
              </div>
              <Skeleton className='w-[110px] h-[35px] rounded-lg mr-4' />
            </div>

          </Skeleton>
        ))
      }
    </>
  )
}

export default SkeletonGameCard