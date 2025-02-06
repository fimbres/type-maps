import { Loader2Icon } from "lucide-react"

export const Loader = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-neutral-200">
      <Loader2Icon size={50} className="text-red-500 animate-spin" />
    </div>
  )
}
