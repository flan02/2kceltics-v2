'use client'

import SignOut from "@/components/reutilizable/sign-out"
import { Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import DisplayProgressBar from "../DisplayProgressBar"
import DisplayPanelButton from "@/components/reutilizable/DisplayPanelButton"
import { useUserPanelStore } from "@/store/store"


type UserProps = {
  session: any
  formattedTier: any
  userId: any
}

const ClientUserWrapper = ({ session, formattedTier, userId }: UserProps) => {
  const { isOpenUserPanel, setIsOpenUserPanel } = useUserPanelStore()

  if (isOpenUserPanel) return (
    <section className='sticky top-0 right-1 w-[280px] h-[150px]'>
      <DisplayPanelButton
        icon={<Image src={session?.user?.image || ""} className='rounded-full border-4 border-orange-400 hover:border-4 hover:border-gray-600 dark:border-4 dark:border-bubble-gum dark:hover:border-4 dark:hover:border-gray-200' width={48} height={48} alt="User Avatar" />}
        isOpen={isOpenUserPanel}
        setOpen={setIsOpenUserPanel}
      />
    </section>
  )

  return (
    <section className='border bg-blue-100/50 dark:bg-stone-900 rounded-md pt-1 pb-4'>
      <div className='flex space-x-10 items-end px-2 py-2'>
        <div className='flex items-end space-x-2'>
          {/* <Image src={session?.user?.image || ""} className='rounded-full' width={36} height={36} alt="User Avatar" /> */}
          <DisplayPanelButton
            icon={<Image src={session?.user?.image || ""}
              className='rounded-full border-2 border-orange-400 hover:border-2 hover:border-gray-600 dark:border-2 dark:border-bubble-gum dark:hover:border-2 dark:hover:border-gray-200' width={36} height={36} alt="User Avatar" />}
            isOpen={isOpenUserPanel}
            setOpen={setIsOpenUserPanel}
          />
          <p className='text-lg text-muted-foreground'>{session?.user?.name}</p>
        </div>
        <div className='flex items-end space-x-2'>
          <Link href={`/user/${userId}`}>
            <Settings className='hover:text-gray-700 text-muted-foreground mb-1' size={20} />
          </Link>
          <div className='-mb-1'>
            <SignOut />
          </div>
        </div>
      </div>
      <div className='flex space-x-2 items-center pt-2 px-4'>
        <p className='text-sm text-celtics'>Tier:</p>
        {
          session && <Badge variant={'default'} className='bg-celtics hover:bg-celtics/80'>{formattedTier}</Badge>
        }
      </div>

      {
        session?.user?.email! && <DisplayProgressBar id={session.user?.email!} />
      }

    </section>
  )
}

export default ClientUserWrapper