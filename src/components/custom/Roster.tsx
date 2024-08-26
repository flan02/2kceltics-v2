import React from 'react'
import BackToTop from '../reutilizable/BackToTop'
import MarkdownRoster from '../../components/markdown/MarkdownRoster.mdx'
import MdxLayout from '../mdx-layout'
import { getCurrentRoster } from '@/app/actions'
import MarkdownRenderer from '../markdown/MarkdownRenderer'


export default async function Roster() {
  // const roster = await getCurrentRoster()
  // {roster && <MarkdownRenderer markdown={roster.players!} />}
  return (
    <section id="roster" className="max-w-screen-xl flex flex-col mx-auto pt-12">
      <div className="flex mx-auto mb-12">
        <h1 className="text-celtics mx-auto w-max text-center text-5xl md:text-7xl text-shadow uppercase mt-24">2023/24 ROSTER</h1>
        <BackToTop />
      </div>
      <br />
      <br />
      <aside className='flex justify-center'>
        {/* INSERTED WITHOUT BBDD CALL */}
        <MdxLayout>
          <MarkdownRoster />
        </MdxLayout>

      </aside>
    </section>
  )
}

