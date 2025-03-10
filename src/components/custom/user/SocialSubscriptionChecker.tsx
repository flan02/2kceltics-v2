'use client'

import { Button } from '@/components/ui/button'
import { CheckFollowersAndSubcriptions, KY } from '@/services/api'
import { Mails } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { FaTwitch, FaXTwitter, FaYoutube } from 'react-icons/fa6'

type SocialMedia = {
  socialMedia: string
  url: string
  icon: JSX.Element
  index: number
}



const SocialSubscriptionChecker = () => {

  const socialMedia: SocialMedia[] = [
    {
      socialMedia: "twitch",
      url: "https://www.twitch.tv/flano2",
      icon: <FaTwitch size={20} color='#9146FF' className='mt-0.5' />,
      index: 1
    },
    {
      socialMedia: "youtube",
      url: "#",
      icon: <FaYoutube size={24} color='#FF0000' className='' />,
      index: 2
    },
    {
      socialMedia: "X",
      url: "#",
      icon: <FaXTwitter size={16} color='#FFF' className='bg-black rounded-sm' />,
      index: 3
    },
    {
      socialMedia: "newsletter",
      url: "#",
      icon: <Mails size={20} color='#555' />,
      index: 4
    }
  ]



  const TwitchConnectButton = () => {

    const connectTwitch = () => {
      const clientId = 'jksx0vwvspp3rbrk00m3i9suf5d2gj'; // Reemplázalo con tu Client ID de Twitch
      const redirectUri = 'http://localhost:3000/api/v1/callback/twitch'; // Debe coincidir con el registrado en Twitch Dev
      const scopes = 'user:read:follows'

      // Generamos un estado aleatorio para evitar ataques CSRF
      const state = Math.random().toString(36).substring(7);
      localStorage.setItem('twitch_auth_state', state)

      const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}`;
      window.location.href = authUrl
    }

    return <Button onClick={connectTwitch} className=''>Conectar con Twitch</Button>
  }


  const TwitchCallback = () => {
    const router = useRouter()

    useEffect(() => {
      const fetchData = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const storedState = localStorage.getItem('twitch_auth_state');

        if (!code || state !== storedState) {
          console.error('Error de autenticación');
          return;
        }

        const response = CheckFollowersAndSubcriptions('twitch', 'flano2')
        console.log('Data received', response)
      }

      fetchData()
    }, [])

    return <p>Authenticating with Twitch...</p>
  }



  return (
    <div className='text-white flex flex-col col-span-2 border rounded-lg mx-1'>
      <div className='flex space-y-2 items-center'>
        <p className='pl-4 pt-2 text-sm text-muted-foreground'>
          Follow us in our social media and get +25
        </p>
        <span className='text-lg ml-1 text-celtics dark:text-muted-foreground'>☘</span>
        <p className='ml-1 text-sm text-muted-foreground'>per each</p>
      </div>
      <div className='flex space-x-4 pl-4 text-sm z-10'>
        {
          socialMedia.map(({ socialMedia, url, icon, index }) => (
            <Link href={`${url}`} target='_blank' className='flex space-x-1 items-center' key={index}>
              <span className='text-sm text-muted-foreground capitalize hover:underline hover:underline-offset-2 hover:text-orange-400 dark:hover:text-bubble-gum'>
                {socialMedia}
              </span>
              {icon}
            </Link>

          ))
        }


      </div>
      <TwitchConnectButton />
    </div>
  )
}

export default SocialSubscriptionChecker

/* 
  const fetchSocialMedia = async (socialMedia: string) => {
    try {
      type TwitchResponse = { success: boolean, followers: number }
      const data = await CheckFollowersAndSubcriptions<TwitchResponse>('twitch', 'flano2')
      console.log('Data received', data)
    } catch (error) {
      console.error('Current API has any problem...', error)

    }
  }
*/