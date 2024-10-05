
import Image from 'next/image'
import PlayoffsLogo from "../../../public/playoffs-logo.png";

type Props = {}

const Playoffs = (props: Props) => {
  return (
    <div className='relative h-[230px] cursor-pointer border inline-block filter grayscale hover:grayscale-0 transition duration-300'>
      <a href="/playoffs" rel="noopener noreferrer">
        <Image src={PlayoffsLogo} alt="playoffs" className='h-full block lg:object-cover xl:object-contain px-8' sizes="(max-width: 768px) 100vw, 33vw" priority />
      </a>

    </div>
  )
}

export default Playoffs

