import React from 'react'
import BackToTop from '../reutilizable/BackToTop'
import MarkdownRoster from '../../components/markdown/MarkdownRoster.mdx'
import MdxLayout from '../mdx-layout'
type Props = {}

const Roster = (props: Props) => {
  return (
    <section id="roster" className="max-w-screen-xl flex flex-col mx-auto pt-12">
      <div className="flex mx-auto mb-12">
        <h1 className="text-celtics mx-auto w-max text-center text-7xl text-shadow uppercase mt-24">2023/24 ROSTER</h1>
        <BackToTop />
      </div>
      <aside className='flex justify-center'>
        <MdxLayout>
          <MarkdownRoster />
        </MdxLayout>
      </aside>
    </section>
  )
}

export default Roster