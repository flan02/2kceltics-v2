'use client';
import { useEffect, useState } from 'react';
import { AnimatedNumber } from '@/components/core/animated-number';

export function AnimatedNumberBasic() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(18);
  }, []);

  return (
    <>
      <span className='text-grad mr-2 mt-2 text-xl lg:text-3xl'>x</span>
      <AnimatedNumber
        className='text-grad text-4xl md:text-5xl mr-2 font-bold'
        springOptions={{
          bounce: 0.7,
          duration: 4000,
        }}
        value={value}
      />
    </>
  );
}
