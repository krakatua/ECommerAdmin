import { useSession } from "next-auth/react";

export default function HomeHeader() {
    const {data: session} = useSession();
    return (
        <div className="text-blue-900 flex justify-between items-center">
      <h2 className="w-full md:w-auto">
        <div className="flex justify-center gap-2">
      <img src={session?.user?.image} className="w-6 h-6 rounded-md block md:hidden"/>
      Hello,<b>{session?.user.name}</b> 

        </div>
      </h2>
      <div className="hidden md:flex h-full bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
      <img src={session?.user?.image} className="w-6 h-6"/>
      <span className="px-2">
      {session?.user.name}
      </span>      
      </div>


    </div>
    )
}