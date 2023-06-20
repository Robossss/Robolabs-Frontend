import Image from "next/image"


export default function Loading(){
  return (
    <div className="flex justify-center w-screen overflow-hidden">
    <Image src="/cog2.svg" className="loading" alt="loader" width={600} height={600}/>
    </div> )}

