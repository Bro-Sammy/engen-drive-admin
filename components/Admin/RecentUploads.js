import { TrendingUpIcon } from '@heroicons/react/outline'
import React from 'react'

function RecentUploads({documents, folders}) {
  return (
    <div className='flex flex-col gap-y-2'>
        {folders.map(docs=> 
        {if(docs.documentIDs.length > 0) return( <div key={docs._id} className='flex gap-3 justify-between items-center py-2 shadow'>
            <span className='pl-2 flex justify-center'>
            <TrendingUpIcon className='w-4 stroke-green-500'/>
            </span>
            <div className='font-bold flex-1 truncate'>{docs.folderName}</div>
            <div className='text-gray-700'>{docs.documentIDs.length}docs</div>
            <div className='pr-2'>5mb</div>
        </div>)}).reverse()}

        {/* <div className='flex justify-around items-center py-2 shadow'>
            <TrendingUpIcon className='w-4 stroke-green-500'/>
            <div className='font-bold overflow-x-auto'>Invoice</div>
            <div className='text-gray-700'>50docs</div>
            <div>5mb</div>
        </div> */}
    </div>
  )
}

export default RecentUploads