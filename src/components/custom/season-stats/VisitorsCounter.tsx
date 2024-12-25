'use client'

import Loading from '@/components/reutilizable/Loading'
import useVisitorsCounter from '@/hooks/useVisitorsCounter'
import { Star } from 'lucide-react'




type Props = {}

const VisitorsCounter = (props: Props) => {
  const print = useVisitorsCounter()
  // print.visitCounter = 100000
  const print_number = parseInt(print.visitCounter!.toString())


  return (
    <section className='flex flex-col space-y-4'>
      <article className="flex space-x-4">
        {
          print
            ? <section className='flex gap-0'>
              <Star className="size-6" color='#007A33' fill={`${print_number >= 5000 ? '#007A33' : '#aaa'}`} />
              <Star className="size-6" color='#007A33' fill={`${print_number >= 15000 ? '#007A33' : '#aaa'}`} />
              <Star className="size-6 " color='#007A33' fill={`${print_number >= 25000 ? '#007A33' : '#aaa'}`} />
              <Star className="size-6 " color='#007A33' fill={`${print_number >= 50000 ? '#007A33' : '#aaa'}`} />
              <Star className="size-6" color='#007A33' fill={`${print_number >= 100000 ? '#007A33' : '#aaa'}`} />
            </section>
            : <Loading />
        }
        <div className='text-md uppercase mt-1 text-purple'>
          25,000 next goal
        </div>
      </article>
      <p className='font-bold text-grad text-xl'>
        {print.visitCounter?.toLocaleString()} <span className='text-gray-500 text-sm font-light'> Users have already visited our Data Center</span>
      </p>
    </section>
  )
}

export default VisitorsCounter