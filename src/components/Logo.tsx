import { MapPinnedIcon } from 'lucide-react';

export const Logo = () => {
  return (
    <div className='p-3 rounded-lg fixed top-10 right-10 z-10 bg-neutral-800 border-2 border-red-500'>
      <MapPinnedIcon size={30} className='text-red-500' />
    </div>
  )
}
