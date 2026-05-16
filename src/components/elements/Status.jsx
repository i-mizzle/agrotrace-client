import React from 'react'

const Status = ({status}) => {
  return (
    <div className={`rounded text-xs flex items-center gap-x-[5px] p-[5px] border border-gray-100 capitalize font-space-grotesk font-[500]
        ${status === 'published' || status === 'subscribed' || status === 'resolved' ? 'bg-green-50 text-green-600' : ''}
        ${status === 'draft' || status === 'unsubscribed' || status === 'pending' ? 'bg-gray-50 text-gray-600': ''}
        ${status === 'investigating' ? 'bg-yellow-50 text-yellow-800': ''}
    `}>
        {status}
    </div>
  )
}

export default Status