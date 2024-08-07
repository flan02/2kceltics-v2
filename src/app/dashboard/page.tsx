import Dashboard from '@/components/custom/Dashboard';
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import { Button, buttonVariants } from '@/components/ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link';






const DashboardPage = async ({ searchParams: { opt } }: { searchParams: { opt: string } }) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  //console.log(user);
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL

  return (
    <MaxWidthWrapper className='min-h-[calc(100vh-60px)]'>
      {
        !user || user.email !== ADMIN_EMAIL
          ? <Link href="/api/auth/login" className={buttonVariants({
            size: "sm", variant: "ghost"
          })}>
            Sign up
          </Link>

          : <Dashboard opt={opt} photo={user?.picture!} given_name={user?.given_name!} />




      }
    </MaxWidthWrapper>
  )
}

export default DashboardPage