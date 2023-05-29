import Image from "next/image"
export interface InputInterface {
    img:string,
    placeholder:string
    }
    
    const Input = ({img,placeholder}:InputInterface) => {
      return (
    <div className="bg-white px-2 h-14 w-96 gap-4 items-center rounded-lg flex ">
                  <i><Image height={20} width={20} src={img} alt="" /></i>
                <input type="text" placeholder={placeholder} className="text-black w-full focus:outline-none" />
                </div>  )
    }
    
    export default Input