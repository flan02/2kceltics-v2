'use client'
import Loading from '@/components/reutilizable/Loading';


import { useEffect, useState } from 'react';
import FilterForm from './FilterForm';
import GameCard from './GameCard';

type Props = {}

const YoutubeComponent = (props: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <FilterForm />
      {
        isClient
          ? (
            <GameCard />
          )
          :
          <Loading />
      }
    </>
  )
}

export default YoutubeComponent


/* 

posibles filtros

home/away
rs/po
win/loss 
season 2k24/2k25, etc

upload component when any was founded <NoResultsFound />

*/