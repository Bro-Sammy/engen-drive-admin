import {
    AtSymbolIcon,
    IdentificationIcon,
    LockClosedIcon,
    PhotographIcon,
    ThumbUpIcon,
    UserIcon,
    XIcon,
  } from "@heroicons/react/outline";
import {useState} from 'react'
import Button from "../Button";
import { useRouter } from "next/router";

function NewEmployeeForm({departData, branchData}) {
    const router = useRouter();
    const [firstName, setFirstName] =  useState('')
    const [lastName, setLastName] =  useState('')
    const [avatar, setAvatar] =  useState('')
    const [email, setEmail] =  useState('')
    const [password, setPassword] =  useState('')
    const [employeeID, setEmployeeID] =  useState('')
    const [branch, setBranch] =  useState('')
    const [department, setDepartment] =  useState('')

    const [error, setError] =  useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('') 
        const data = {
            firstName,lastName,avatar,email,password,employeeID,branch,department
        } 
        if(firstName === '' || lastName === '' || avatar === '' || email === '' || password === '' || employeeID === '' || branch === '' || department === ''){
          return setError('Sorry, fields cannot be empty')
        }
        const response = await fetch('/api/employees', {
            method: 'POST',
            body: JSON.stringify({data}),
            headers: {'Content-Type': 'application/json'}
        })
        const results = await response.json()
        if(results?.error)
        {
          setError(results.error)
          return
        }
        return router.push('/admin/employees')
      };

  return (
    <div>
        <form className="z-10 flex flex-col gap-y-3" onSubmit={handleSubmit}>
           {error &&  <span className={`w-full text-white bg-red-600 p-2 rounded flex gap-2 justify-between`}>{error} <XIcon onClick={()=>setError(!error)} className="w-5 text-slate-200 hover:text-white"/></span>}
            <div className="relative w-72 mt-2">
              <UserIcon className="h-6 absolute right-2 top-2 text-slate-400" />
              <input
                type={"text"}
                placeholder={"First Name"} 
                required
                onChange={(e) => setFirstName(e.target.value)}
                className="form-input px-4 py-2 w-full rounded-2xl placeholder:text-slate-400"
              />
            </div> 
          
            <div className="relative w-72 mt-2">
              <UserIcon className="h-6 absolute right-2 top-2 text-slate-400" />
              <input 
                required
                onChange={(e) => setLastName(e.target.value)}
                type={"text"}
                placeholder={"Last Name"}
                className="form-input px-4 py-2 w-full rounded-2xl placeholder:text-slate-400"
              />
            </div>
          
          
            <div className="relative w-72 mt-2">
              <PhotographIcon className="h-6 absolute right-2 top-3 text-slate-400" />
              <input 
                required
                onChange={(e) => setAvatar(e.target.value)}
                type={"text"}
                placeholder="image url"
                minLength={30} 
                className="form-input px-4 py-2 w-full rounded-2xl placeholder:text-slate-400"
              />
            </div>
          

          
            <div className="relative w-72 mt-2">
              <AtSymbolIcon className="h-6 absolute right-2 top-2 text-slate-400" />
              <input 
                required
                onChange={(e) => setEmail(e.target.value)}
                type={"email"}
                placeholder={"user@engenmail.com"}
                className="form-input px-4 py-2 w-full rounded-2xl placeholder:text-slate-400"
              />
            </div>
          
          
            <div className="relative w-72 mt-2">
              <LockClosedIcon className="h-6 absolute right-2 top-2 text-slate-400" />
              <input 
                required
                onChange={(e) => setPassword(e.target.value)}
                type={"password"}
                placeholder={"password"}
                className="form-input px-4 py-2 w-full rounded-2xl placeholder:text-slate-400"
              />
            </div>
          
          
            <div className="relative w-72 mt-2">
              <IdentificationIcon className="h-6 absolute right-2 top-2 text-slate-400" />
              <input 
                required
                onChange={(e) => setEmployeeID(e.target.value)}
                type={"text"}
                placeholder={"Employee ID"}
                className="form-input px-4 py-2 w-full rounded-2xl placeholder:text-slate-400"
              />
            </div>
                 
            <div className="relative w-72 mt-1">
              <label className="text-sm text-slate-700">Choose Branch</label>
              <select
                className="form-input px-4 py-2 w-full rounded-2xl placeholder:text-slate-400"
                name="Logs" 
                required
                onChange={(e) => setBranch(e.target.value)}
              >
                <option value="">select</option>
                { branchData.map(list=>{ 
                  return(<option key={list._id} value={list._id}>{list.branchName}</option>)
                })}
              </select>
            </div>
          
          
            <div className="relative w-72 mt-1">
              <label className="text-sm text-slate-700">
                Choose Department
              </label>
              <select
                className="form-input px-4 py-2 w-full rounded-2xl placeholder:text-slate-400"
                name="Logs" 
                required
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">select</option>
                { departData.map(list=>{ 
                  return(<option key={list._id} value={list._id}>{list.departmentName  + " - " + list.branchID.branchName}</option>)
                })}
              </select>
            </div> 
            
            <Button
          text={"Create"}
          styles={"px-4 py-3 w-full font-semibold text-lg mt-1 border-white border-1 hover:bg-blue-900 hover:ring-1 hover:ring-offset-2 ring-blue-800 text-white tracking-wider shadow-sm rounded-2xl"}
        />
        </form>
    </div>
  )
}

export default NewEmployeeForm