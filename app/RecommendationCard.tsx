import Image from 'next/image'
import { profileInterface } from './profiles'

const RecommendationCard = ({name,img,description}:profileInterface) => {
  return (
    <div className='flex flex-col items-center text-center gap-4 border-r-2 px-4 last:border-0'>
        <Image src={img} width={50} height={50} alt={name} />
        <h1 className='text-2xl'>{name}</h1>
        <p>{description}</p>
    </div>
  )
}

export default RecommendationCard