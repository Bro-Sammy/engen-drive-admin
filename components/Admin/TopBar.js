import Image from 'next/image'
import React from 'react'
import Quicklinks from './Quicklinks'
import SearchBar from './SearchBar'
import Time from './Time'

function TopBar({title,  data, branches, departments, documents, folders}) {
  return (
    <div className='w-5/6 fixed z-30'>
        <div className='flex flex-col w-full bg-white shadow'>
            {/* Title Bar */}
            <div className='flex flex-row justify-between'>
                {/* Logo & Title */}
                <div className='flex px-4 py-3 items-center ml-2 w-full'>
                    <div className='object-cover w-12 h-12 rounded-xl overflow-hidden'>
                        <Image src={'/Engen_Logo.jpeg'} width={212} height={212} alt="Logo" blurDataURL='/Engen_Logo.jpeg' placeholder='blur'/>
                    </div>
                    <div className='pl-4 py-1'>
                        <h2 className='font-bold text-2xl tracking-wider'>{title}</h2>
                        <small className='text-base text-gray-700'>Engen-Drive</small>
                    </div>
                </div>

                {/* Search bar */}
                <div className='py-3 items-center w-full flex justify-center'>
                    <SearchBar employees={data} branches={branches} departments={departments} documents={documents} folders={folders}/>
                </div>

                {/* Time */}
                <div className='w-full flex justify-end pr-8'>
                    <Time/>
                </div>
            </div>


            {/* Quick Links */}
            <div className='flex flex-row justify-between'>
                <Quicklinks  data={data} branches={branches} departments={departments} documents={documents}/>
            </div>

        </div>
    </div>
  )
}

export default TopBar