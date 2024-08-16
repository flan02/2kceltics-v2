import React from 'react'
import { Icons } from './Icons'
import { Heart } from 'lucide-react'

type Props = {
}

type LiIconsProps = {
  component: React.ReactNode
  icon_name?: string
}


const LiIcons = (props: LiIconsProps) => {
  return (
    <li>
      <a href="#" className="flex items-center space-x-3 hover:text-sky-400 transition" referrerPolicy='no-referrer' rel='noopener' target='_blank'>
        {props.component}
        <span className='capitalize'>{props.icon_name}</span>
      </a>
    </li>
  )
}

const links = [
  "Home",
  "About",
  "Guide",
  "Blocks",
  "Contact",
  "Terms of Use"
]

const groupIcons: { [key: string]: React.ReactNode } = {
  github: <Icons.github key={0} />,
  twitter: <Icons.twitter key={1} />,
  youtube: <Icons.youtube key={2} />,
  facebook: <Icons.facebook key={3} />,
  medium: <Icons.medium key={4} />,
  pinterest: <Icons.pinterest key={5} />,
  instagram: <Icons.instagram key={6} />
}

const Footer = (props: Props) => {
  return (
    <footer className="relative py-20 flex flex-col items-center bg-cyan-900 overflow-hidden md:py-40">
      <div className="relative z-[1] container m-auto px-6 md:px-12">
        <div className="m-auto md:w-10/12 lg:w-8/12 xl:w-6/12">
          <div className="flex flex-wrap items-center justify-between md:flex-nowrap">
            <div className="w-full space-x-12 flex justify-center text-gray-300 sm:w-7/12 md:justify-start">
              <ul className="list-disc list-inside space-y-8">
                {
                  links.map((link, index) => (
                    <li key={index}><a href="#" className="hover:text-sky-400 transition">{link}</a></li>
                  ))
                }

              </ul>

              <ul role="list" className="space-y-8">
                {
                  Object.keys(groupIcons).map((key, index) => (
                    <LiIcons key={key} component={groupIcons[key]} icon_name={key} />
                  ))
                }

              </ul>
            </div>
            <div className="w-10/12 m-auto  mt-16 space-y-6 text-center sm:text-left sm:w-5/12 sm:mt-auto">
              <div className="flex">

                <span className="block text-gray-300">We created this website for every Celtics fans with love </span>
                <Heart fill='red' color='red' />
              </div>

              <span className="block text-white underline">2kceltics &copy; {new Date().getFullYear()}</span>

              <span className="flex justify-between text-white">
                <a href="#" className="font-semibold">Terms of Use </a>
                <a href="#" className="font-semibold"> Privacy Policy</a>
              </span>

              <span className="block text-gray-300">Need help? <a href="#" className="font-semibold text-white">&nbsp; Contact Us</a></span>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute h-full inset-0 flex items-center">
        <div aria-hidden="true" className="bg-layers bg-scale w-56 h-56 m-auto blur-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full md:w-[30rem] md:h-[30rem] md:blur-3xl"></div>
      </div>
      <div aria-hidden="true" className="absolute inset-0 w-full h-full bg-[#020314] opacity-80"></div>
    </footer>


  )
}

export default Footer