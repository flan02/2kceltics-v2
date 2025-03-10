'use client'

import Image from "next/image"
import DisplayPanelButton from "../../reutilizable/DisplayPanelButton"
import { FaRankingStar } from "react-icons/fa6"
import { UserSession } from "@/lib/types"
import { useOpenPanelStore } from "@/store/store"
import { TextShimmer } from "@/components/core/text-shimmer"

type Props = {
  countUsers: number
  top5: UserSession[]
}

const ClientRankingWrapper = ({ top5, countUsers }: Props) => {
  const { isOpenRankingTier, setIsOpenRankingTier } = useOpenPanelStore()

  if (isOpenRankingTier) return <DisplayPanelButton icon={<FaRankingStar className='fixed top-36 right-2 text-4xl mb-1.5 dark:text-bubble-gum text-orange-400 dark:hover:text-gray-200 hover:text-gray-600' />} isOpen={isOpenRankingTier} setOpen={setIsOpenRankingTier} />

  return (
    <section className='border bg-blue-100/50 dark:bg-stone-900 rounded-md pt-1 pb-4'>
      <div className='flex space-x-10 items-end px-2 py-2'>
        <div className='text-center w-full py-1 flex justify-center items-center space-x-4'>
          <TextShimmer className="text-xl [--base-color:theme(colors.green.500)] [--base-gradient-color:theme(colors.green.200)] dark:[--base-color:theme(colors.green.700)] dark:[--base-gradient-color:theme(colors.green.400)]">TOP TIER USERS</TextShimmer>
          <DisplayPanelButton icon={<FaRankingStar className='text-3xl mb-1.5 dark:text-bubble-gum text-orange-400 dark:hover:text-gray-200 hover:text-gray-600' />} isOpen={isOpenRankingTier} setOpen={setIsOpenRankingTier} />
        </div>
      </div>
      <div className='flex space-x-2 items-center pt-2 px-4'>
        <div className='flex flex-col space-y-3'>
          {
            top5.map((user: UserSession, index: number) => {
              return (
                <div key={index} className='flex items-center space-x-2'>
                  <Image src={user.image || ""} className='w-9 h-7 rounded-full' width={36} height={36} alt="User Avatar" />
                </div>
              )
            })
          }
        </div>
        <div className='flex mt-1 flex-col space-y-5 w-full'>
          {
            top5.map((user: UserSession, index: number) => {
              return (
                <p key={index} className='text-sm font-bold text-orange-400 dark:text-bubble-gum'>{user.nickname || user.name}</p>
              )
            })
          }
        </div>
        <div className='flex flex-col mt-1 space-y-5 items-end'>
          {
            top5.map((user: UserSession, index: number) => {
              return (
                <p key={index} className='text-sm font-bold text-orange-400 dark:text-bubble-gum'>{user.totalPoints}</p>
              )
            })
          }
        </div>
      </div>
      <p className="text-[10px] mt-4 uppercase text-end dark:text-white text-muted-foreground pr-2">{`total users: ${countUsers + 500}`}</p>
    </section>
  )
}

export default ClientRankingWrapper