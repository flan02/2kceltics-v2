/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import ky from 'ky'
import { ReactNode, useEffect, useState } from 'react'


type Props = {}

const VisitorsCounter = (props: Props) => {
  const [visitCounter, setVisitCounter] = useState<ReactNode>("...")

  const getVisitors = async () => {
    //console.log((window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming).type);
    const data: any = await ky.get('/api/v1/addvisit').json()
    //console.log(data);

    setVisitCounter(data.count)
    if ((window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming).type !== 'reload') {
      ky.post('/api/v1/addvisit',
        { json: { count: data.count + 1 } }).json()
    }
  }
  useEffect(() => {

    getVisitors()
  }, [])
  return (
    <div className=''>
      <h1 className='text-3xl lowercase text-celtics text-center'>VISITORS COUNTER: &nbsp; {visitCounter}</h1>
    </div>
  )
}

export default VisitorsCounter