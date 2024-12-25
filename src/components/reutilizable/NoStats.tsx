import MaxWidthWrapper from "./MaxWidthWrapper"


type Props = {}

const NoStats = (props: Props) => {
  return (
    <MaxWidthWrapper className='min-h-[calc(70vh-150px)] mt-4 mb-12 pb-8 place-content-center text-celtics border'>
      <div className='flex justify-center items-center'>
        <p className='text-2xl text-center'>Full stats are displayed from season 2024-25.</p>
      </div>
    </MaxWidthWrapper>
  )
}

export default NoStats