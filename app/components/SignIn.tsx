"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "firebase/auth";
import { auth } from '../firebase';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog) {
            if (isModalOpen) {
                dialog.showModal();
            } else {
                dialog.close();
            }
        }
    }, [isModalOpen]);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setIsModalOpen(false);
        } catch (err: any) {
            setError(err.message);
            console.error("Error signing up: ", err);
        }
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsModalOpen(false);
        } catch (err: any) {
            setError(err.message);
            console.error("Error signing in: ", err);
        }
    };

    return (
        <>
            <button onClick={() => setIsModalOpen(true)} type="button" className="bg-gray-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-gray-600 cursor-pointer">Sign In/Sign Up</button>
            <dialog ref={dialogRef} id="sign-in-sign-up-modal" className="p-0 rounded-lg shadow-xl bg-gray-800 text-white w-full max-w-sm mg-auto animate-fade-in m-auto" onClose={() => setIsModalOpen(false)}>
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 relative">
                    <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <svg
                xmlns="http://www.w3.org/2000/svg"
                className={ "w-10 h-10 text-white mx-auto"}
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
                                      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email address</label>
                                <div className="mt-2">
                                    <input id="email" type="email" name="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Password</label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input id="password" type="password" name="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                                </div>
                            </div>
                            
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <div className="flex space-x-4">
                                <button onClick={handleSignIn} className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer">Sign in</button>
                                <button onClick={handleSignUp} className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 cursor-pointer">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default SignIn; 