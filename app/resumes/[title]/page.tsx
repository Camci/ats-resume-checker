"use client";
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import ResumeDetailCard from '@/app/components/ResumeDetailCard';
import Navbar from '@/app/components/Navbar';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/app/firebase';
const ResumePage = () => {
  const { title } = useParams()
  const searchParams = useSearchParams()
  const analysisResult = searchParams.get('analysisResult')
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
    return (
        <main className="flex flex-col justify-between font-sans min-h-screen p-4 dark:bg-gray-900 relative">
        <div className='bg-gray-900'>
        <Navbar user={user} className='mt-0 mb-8' />
        <div className='max-w-full mr-auto ml-auto bg-gray-900'>
        
            <h2 className="text-3xl font-semibold mb-8 tracking-tight text-white">Resume Analysis</h2>
            <ResumeDetailCard analysisResult={analysisResult as string}  title={title as string}/>
        </div>
        </div>
        </main>

    )
}

export default ResumePage;