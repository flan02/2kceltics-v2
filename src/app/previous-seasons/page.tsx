

import DefaultPage from '../../components/reutilizable/DefaultPage';

type Props = {}

const PreviousPage = (props: Props) => {
  return (
    <DefaultPage
      title='THIS SITE IS BEING DEVELOPED AT THIS MOMENT'
      image_url='/marcus-smart23.png'
      photo_dimension={{
        width: 400,
        height: 400
      }}
      className={{
        title: '2xl:text-8xl xl:text-7xl md:text-5xl lg:text-6xl text-5xl text-celtics leading-tight md:leading-tight lg:leading-tight xl:leading-tight'
      }}
    />
  )
}

export default PreviousPage