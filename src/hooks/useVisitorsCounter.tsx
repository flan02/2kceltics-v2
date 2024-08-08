import { KY, Method } from '@/services/api'
import { ReactNode, useEffect, useState } from 'react'

type Props = {}

const useVisitorsCounter = () => {
  const [visitCounter, setVisitCounter] = useState<ReactNode>("...")

  const getVisitors = async () => {
    const data: any = await KY(Method.GET, '/api/v1/addvisit')
    //console.log(data);
    setVisitCounter(data.count)

    if ((window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming).type !== 'reload') {
      //ky.post('/api/v1/addvisit',
      // { json: { count: data.count + 1 } }).json()
      await KY(Method.POST, '/api/v1/addvisit', { json: { count: data.count + 1 } })
    }

  }
  useEffect(() => {

    getVisitors()
  }, [])
  return { visitCounter }
}

export default useVisitorsCounter