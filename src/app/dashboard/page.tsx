import Dashboard from '@/components/custom/dashboard/Dashboard';
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { User } from '@prisma/client';
import { notFound } from 'next/navigation';
import { getKindeUser } from './actions';



const DashboardPage = async ({ searchParams: { opt } }: { searchParams: { opt: string } }) => {
  const { getUser } = getKindeServerSession()
  const userKinde = getUser()

  if (!userKinde) notFound()


  const user = await getKindeUser(userKinde.id!) as User

  if (!user) console.log("User not found on prisma")
  console.log("User saved on prisma", user)


  return (
    <MaxWidthWrapper className='min-h-[calc(100vh-60px)] mb-16'>
      <Dashboard opt={opt} photo={user?.picture!} given_name={user?.given_name!} />
    </MaxWidthWrapper>
  )
}


export default DashboardPage





