'use client'
import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
// import { X } from 'lucide-react' // Optional: for close icon

export default function Notification({ type = 'success', message, onClose }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false)
      onClose?.()
    }, 4000)

    // return () => clearTimeout(timeout)
  }, [onClose])

  if (!show) return null

  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-md shadow-md flex items-start gap-3 max-w-sm w-full text-white animate-slide-in 
      ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
        <div className='relative w-full flex items-start'>
            <div className="w-[95%]">
                <p className="font-medium">{message}</p>
            </div>
            
            <button onClick={() => { setShow(false); onClose?.() }} className='w-[5%] bg-gray-50 text-black'>
                <FiX size={18} className="opacity-70 hover:opacity-100" />
            </button>
        </div>
      
    </div>
  )
}