import Link from 'next/link'
import React from 'react'
import SignIn from './SignIn'
import { auth, db } from "../firebase";
import { User, signOut } from 'firebase/auth';

function Navbar({ user, className }: { user: User | null, className: string }) {
    
    const handleSignOut = async () => {
        try {
          await signOut(auth);
        } catch (error) {
          console.error("Error signing out: ", error);
        }
      };
    
  return (
    <nav className={`flex flex-row justify-between ${className} bg-white p-4 rounded-2xl shadow-md dark:bg-gray-700 border border-gray-50 dark:border-gray-700`}>
    <div className="flex space-x-4 items-center">
    <Link href="/">
    <svg
                xmlns="http://www.w3.org/2000/svg"
                className={ "w-10 h-10 text-white"}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6M9 16h6M8 9h8M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
                />
              </svg>
    </Link>
    </div>
    <div className="flex space-x-4 items-center">

    {user ? (
      <div className="flex items-center space-x-4">
        <p className="text-gray-400">Welcome, {user.email}</p>
        <button 
          onClick={handleSignOut} 
          className="bg-red-500 text-white px-4 py-1 text-sm rounded-md hover:bg-red-600 cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    ) : (
      <SignIn />
    )}
    </div>

  </nav>
  )
}

export default Navbar