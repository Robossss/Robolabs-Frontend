import Image from "next/image"

const Lesson = () => {
  return (
    <main>
        <header className="bg-[#1E1E1E] p-5 flex justify-between items-center">
        <Image src='/logo2.svg' alt="logo" width={200} height={20} />
            <h1 className="text-3xl">Introduction to  RoboLabs</h1>
        <div className="flex gap-4">
            <div className="flex justify-center gap-4 w-[200px]">
                <Image src="/box.svg" alt="Coding Area" width={20} height={20}/>
                <Image src="/chat.svg" alt="Chat" width={20} height={20}/>
            </div>
        </div>
        </header>
        <aside>
            
        </aside>
    </main>
  )
}

export default Lesson