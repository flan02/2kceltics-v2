import Dashboard from '@/components/custom/Dashboard';
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import { Button, buttonVariants } from '@/components/ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link';
import { notFound } from 'next/navigation';






const DashboardPage = async ({ searchParams: { opt } }: { searchParams: { opt: string } }) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  //console.log(user);
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL
  if (!user || user.email !== ADMIN_EMAIL) notFound()
  return (
    <MaxWidthWrapper className='min-h-[calc(100vh-60px)]'>
      <Dashboard opt={opt} photo={user?.picture!} given_name={user?.given_name!} />
    </MaxWidthWrapper>
  )
}

export default DashboardPage