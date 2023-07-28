import Image from 'next/image'
import { profileInterface } from './profiles'

const ProfileCard = ({name,img,description}:profileInterface) => {
  return (
    <div className={`rounded-[50px] shadow-md ${name==="Intermediates" && "shadow-2xl scale-125"} text-center bg-white`}>
        <Image width={4500} height={4500} src={img} alt="" />
        <div className=" w-4/5 p-4 mx-auto text-purple">

        <h1 className=' text-[2rem] font-extrabold'>{name}</h1>
        <p className=''>{description}</p>
        </div>
    </div>
  )
}

export default ProfileCard