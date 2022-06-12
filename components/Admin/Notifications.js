import { BellIcon, ChatAltIcon } from '@heroicons/react/outline'
import React from 'react'

function Notifications() {
  return (
    <>
     <div className='flex flex-row gap-x-4'>
         <div className='relative w-8'>
             <span className='absolute right-1 w-3 h-3 bg-pink-600 rounded-full'></span>
             <BellIcon className='w-8 stroke-gray-900 stroke-1'/>
         </div>

         <div className='relative w-8'>
            <span className='absolute right-0 w-3 h-3 bg-pink-600 rounded-full'></span>
             <ChatAltIcon className='w-8 stroke-gray-900 stroke-1'/>
         </div>
     </div>
    </>
  )
}

export default Notifications