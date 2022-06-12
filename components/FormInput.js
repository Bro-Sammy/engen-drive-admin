import React from 'react'

function FormInput({type, placeholder}) {
  return (
    <div>
        <input type={type} className="form-input px-4 py-2 w-full rounded-2xl placeholder:text-slate-400" placeholder={placeholder} required/>
    </div>
  )
}

export default FormInput