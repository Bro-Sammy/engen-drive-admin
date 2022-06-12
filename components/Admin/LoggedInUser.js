import Image from 'next/image'
import React from 'react'
import { getSession, useSession } from "next-auth/react";

function LoggedInUser() {
  const  {data: session } =  useSession()
  return (
    <>
        <div className='flex gap-x-2 items-center'>

          <div className='flex flex-col items-end'>
            <h3 className='font-bold tracking-wide'>Hi, {session.name.username}</h3>
            <small className='text-gray-600'>Super-admin</small>
          </div>

          <div className='w-10 h-10'>
             <Image src={'/kelvin.png'} layout="responsive" width={100} height={100} blurDataURL={'/kelvin.png'} placeholder='blur' alt="kelvin" className="object-cover rounded-full"/>
          </div>
        </div>
    </>
  )
}

export default LoggedInUser