'use client'
import { Suspense } from 'react'
import UpdatePostPage from '@/components/ui/UpdatePostContent'

export default function UpdatePost() {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <UpdatePostPage />
    </Suspense>
  )
}
