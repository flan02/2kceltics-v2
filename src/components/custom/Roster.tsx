import React from 'react'
import BackToTop from '../reutilizable/BackToTop'
//import MarkdownRoster from '../../components/markdown/MarkdownRoster.mdx'
//import MdxLayout from '../mdx-layout'
import { getCurrentRoster } from '@/app/actions'
import MarkdownRenderer from '../markdown/MarkdownRenderer'
import { Card, CardContent } from '../ui/card'


{/* INSERTED WITHOUT BBDD CALL 
        <MdxLayout>
          <MarkdownRoster />
        </MdxLayout>
        */}

export default async function Roster() {
  const roster = await getCurrentRoster() // retrieved from the database
  //console.log(roster);

  return (
    <section id="roster" className="max-w-screen-xl flex flex-col mx-auto pt-4 lg:pt-12">
      <div className="flex mx-auto mb-2 lg:mb-12">
        <h1 className="text-grad mx-auto w-max text-center text-4xl sm:text-5xl md:text-7xl text-shadow uppercase mt-24">2024/25 ROSTER</h1>
        <BackToTop />
      </div>
      <br />
      <br />

      <Card className="md:flex md:justify-center py-4 block md:py-0 dark:bg-night-80/60 bg-white/20">
        <CardContent className="px-0 py-4 grid place-content-center">
          {
            roster && <MarkdownRenderer markdown={roster.players!} />
          }
        </CardContent>
      </Card>




    </section>
  )
}

