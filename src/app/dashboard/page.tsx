import { auth } from '@/auth';
import Dashboard from '@/components/custom/dashboard/Dashboard';
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import Image from 'next/image';
import Link from 'next/link';
import CelticsTrebol from '../../../public/celtics-trebol.png'
import SignIn from '@/components/reutilizable/sign-in';




const DashboardPage = async ({ searchParams: { opt } }: { searchParams: { opt: string } }) => {

  const session = await auth()

  console.log(session);
  // if (!session) redirect('/login')

  return (
    <MaxWidthWrapper className='min-h-[calc(100vh-60px)] mb-16'>

      {
        session && session.user
          ? <Dashboard opt={opt} photo={session?.user?.image!} given_name={session?.user?.name!} />
          : <article className='flex flex-col space-y-8 justify-center items-center h-[calc(100vh-150px)]'>
            <Image src={CelticsTrebol} width={300} height={300} alt='Celtics trebol' className='size-auto' />
            {
              session && session?.user ? (
                <section className='flex flex-col space-y-4'>
                  <p className='text-3xl text-celtics font-bold'>Welcome back {session.user.name}</p>
                  <Link href='/dashboard' className='font-bold text-sm text-center hover:underline'>
                    Go to Admin Panel
                  </Link>
                </section>
              ) : <SignIn />
            }
          </article>
      }



    </MaxWidthWrapper>
  )
}


export default DashboardPage





