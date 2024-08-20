import YoutubeComponent from "@/components/custom/streamed-games/YoutubeComponent"
import DefaultPage from "@/components/reutilizable/DefaultPage"
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper"


type Props = {}

const StreamedGamesPage = (props: Props) => {
  const photo_dimension = {
    width: 400,
    height: 400
  }
  const className = {
    title: 'xl:text-7xl md:text-5xl lg:text-6xl text-5xl text-celtics leading-tight md:leading-tight lg:leading-tight xl:leading-tight'
  }
  return (
    <MaxWidthWrapper className='min-w-[350px] lg:max-w-5xl min-h-[calc(100vh-50px)] lg:px-0 mb-16'>
      {/* 
      <DefaultPage title={'THIS SITE IS BEING DEVELOPED AT THIS MOMENT'} image_url={'/marcus-smart23.png'} className={className} photo_dimension={photo_dimension} />
      */}
      <section className='flex flex-col justify-start items-center mt-16 py-8 border border-slate-200 rounded-lg w-full h-screen'>
        <h1 className=' text-center text-4xl text-celtics'>STREAMED GAMES</h1>
        <br />
        <YoutubeComponent />
      </section>
    </MaxWidthWrapper>
  )
}

export default StreamedGamesPage