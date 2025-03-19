/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Button } from '@/components/ui/button'
import { CheckFollowersAndSubcriptions, KY } from '@/services/api'
import { Mails } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaTwitch, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { TwitchConnectButton } from './TwitchConnectButton'
import { TokenStore, useTokenStore } from '@/store/store'
import ky from 'ky'
import { TokenBody } from '@/lib/types'

type SocialMedia = {
  socialMedia: string
  url: string
  icon: JSX.Element
  index: number
}


type UserProps = {
  userId: string // ? Remember userId is session.user.email from authjs
}


const SocialSubscriptionChecker = ({ userId }: UserProps) => {

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




  const fetchTwitchData = async () => {

    try {
      const accessToken = localStorage.getItem("twitch_token");
      if (!accessToken) {
        console.error("No Twitch token found in localStorage");

        return;
      }

      const parsedToken = JSON.parse(accessToken) as TokenBody; // *🚀 Parse the token data

      const response = await ky.post("http://localhost:3000/api/v1/thirdparty-userdata", {
        headers: {
          Authorization: `Bearer ${parsedToken.access_token}`,
          "Content-Type": "application/json",
        },
        json: { provider: "twitch" }
      });
      const data = await response.json();
      console.log('Twitch user data:', data);


    } catch (error) {
      console.error("Error fetching Twitch data:", error);
    } finally {

    }
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
      <Button
        onClick={fetchTwitchData}
      >Try retrieve twitch data</Button>

    </div>
  )
}


export default SocialSubscriptionChecker
