import BackToTop from "../reutilizable/BackToTop"


type Props = {}

const Schedule = (props: Props) => {
  return (
    <section id="schedule" className="max-w-screen-xl flex mx-auto pt-12">
      <div className="flex mx-auto">
        <h1 className="text-celtics mx-auto w-max text-center text-5xl md:text-7xl text-shadow uppercase mt-24">2023/24 SCHEDULE</h1>
        <BackToTop />
      </div>
    </section>
  )
}

export default Schedule