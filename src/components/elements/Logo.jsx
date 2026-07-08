import React from 'react'
import AgroTraceIcon from '../../assets/img/icon-tight.svg'

const Logo = () => {
  return (
    <div className='w-max px-3 flex items-end gap-x-1'>
      <img src={AgroTraceIcon} alt="AgroTraceNG Logo" className="h-15" />
      <h1 className='text-2xl font-bold tracking-tighter dark:text-accent text-at-black'>AgroTraceNG</h1>
    </div>
  )
}

export default Logo