import React from 'react'
import NewForm from './NewForm'
import QLinkItems from './QLinkItems'

function Quicklinks({ data, branches, departments, documents }) {
  return (
    <>
    <div className='flex flex-row justify-between items-center pb-4 pt-3 w-full pr-9 pl-28 bg-slate-50'>
      <div>
        <NewForm data={data} branches={branches} departments={departments} documents={documents} />
      </div>
      
      <div className=''>
        <QLinkItems data={data} branches={branches} departments={departments} documents={documents}/>
      </div>
    </div>

    </>
  )
}

export default Quicklinks