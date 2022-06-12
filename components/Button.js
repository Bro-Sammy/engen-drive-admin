import React from 'react'

function Button({text, styles}) {
  return (
    <div>
        <button className={`${styles} btn-primary`}>{text}</button>
    </div>
  )
}

export default Button