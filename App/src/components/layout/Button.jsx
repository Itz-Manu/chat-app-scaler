import React from 'react'

export default function Button({
    children,
    type = 'button',
    bgColor = 'bg-slate-800',
    textColor = 'text-white',
    className = '',
    ...props

}) {
  return (
    <button className={`px-3 py-2 rounded-md shadow-md font-semibold bg-black text-white transition-all duration-300 hover:bg-gray-700 ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}