import DashboardLayout from '@/components/ui/DashboardLayout'
import React from 'react'
import { Settings } from 'lucide-react'

const SettingsPage = () => {
  return (
    <>
        <DashboardLayout
            page="Settings"
        >
            {/* Example grid */}
            <div className="text-gray-800 dark:text-gray-100 min-h-screen py-5 lg:px-4">
                <h1 className='text-4xl font-bold flex items-center'><Settings className="w-7 h-7 me-1" /> Settings</h1>
            </div>
        </DashboardLayout>
    </>
  )
}

export default SettingsPage

