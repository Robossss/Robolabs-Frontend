import Image from 'next/image'
import { profileInterface } from './profiles'

const ProfileCard = ({name,img,description}:profileInterface) => {
  return (
    <div className='flex flex-col gap-2'>
        <Image width={430} height={450} src={img} alt="" />
        <h1 className=' text-3xl'>{name}</h1>
        <p className='w-1/2'>{description}</p>
    </div>
  )
}

export default ProfileCard