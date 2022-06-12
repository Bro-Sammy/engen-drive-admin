import { SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import {useState, useEffect} from 'react'

function SearchBar({employees ,branches, departments, documents, folders}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFolder = searchTerm ? [...folders].filter((folder)=> folder.folderName.toLowerCase().includes(searchTerm.toLowerCase())) : [];
  const filteredDocs = searchTerm ? [...documents].filter((docs)=> docs.documentName.toLowerCase().includes(searchTerm.toLowerCase())) : [];
  const filteredEmployees = searchTerm ? [...employees].filter((employee)=> employee.firstName.toLowerCase().includes(searchTerm.toLowerCase())) : [];
  const filteredBranches = searchTerm ? [...branches].filter((branch)=> branch.branchName.toLowerCase().includes(searchTerm.toLowerCase())) : [];

  useEffect(() => {
    function onkeydown(event){
      if(event.key === 'Escape'){ 
        setIsOpen(!isOpen)
      } 
    }
    window.addEventListener('keydown', onkeydown)
    return () => {
      window.removeEventListener('keydown', onkeydown)
    }
  }, [isOpen])

  return (
    <div>
      <form className="relative">
        <div className="relative w-[28rem]">
          <input type={"text"} placeholder="Search" className="w-full rounded-xl" onChange={(e)=>setSearchTerm(e.target.value)}/>
          <button className="absolute right-0 px-4 btn-primary h-full rounded-r-lg ">
            <SearchIcon className="w-8 stroke-slate-300 hover:stroke-slate-100 stroke-1"/>
          </button>
        </div>

        {searchTerm && !isOpen && <div className={`absolute top-13 bg-white rounded-xl max-h-40 overflow-y-auto w-full shadow-2xl  ${searchTerm ? 'translate-y-2': ''}`}>
          <ul className="">
            {[...filteredDocs, ...filteredFolder, ...filteredBranches, ...filteredEmployees].map(term=> {
              return(<Link key={term._id} href={'#'}><a><li onClick={(e)=>setSearchTerm(e.target.value)} className="px-4 py-2 hover:btn-primary hover:text-slate-50 hover:font-bold hover:duration-100">{term.documentName || term.folderName || term.firstName || term.branchName}</li></a></Link>)
              })}
          </ul>
        </div> }
      </form>
    </div>
  );
}

export default SearchBar;
