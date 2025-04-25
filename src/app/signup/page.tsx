"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { authClient } from "@/lib/auth-client"; //import the auth client

export default function page() {
  const router = useRouter()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  const { data, error } = await authClient.signUp.email({
    email, // user email address
    password, // user password -> min 8 characters by default
    name, // user display name
    callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
}, {
    onRequest: (ctx) => {
        //show loading
    },
    onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page
    },
    onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
    },
})
}
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign up</h2>
      </div>
      <div>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-4 bg-indigo-600 text-white rounded hover:text-white hover:bg-indigo-500 font-bold"
        >
          back to frontpage
        </button>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  <form className="space-y-6" action="#" method="POST">
    <div>
      <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Name</label>
      <div className="mt-2">
        <input 
          onChange={(e) => setName(e.target.value)} 
          type="text" 
          name="name" 
          id="name" 
          autoComplete="name" 
          required 
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
        />
      </div>
    </div>

    <div>
      <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
      <div className="mt-2">
        <input 
          onChange={(e) => setEmail(e.target.value)} 
          type="email" 
          name="email" 
          id="email" 
          autoComplete="email" 
          required 
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
        />
      </div>
    </div>

    <div>
      <div className="flex items-center justify-between">
        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
        <div className="text-sm">
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
        </div>
      </div>
      <div className="mt-2">
        <input 
          onChange={(e) => setPassword(e.target.value)} 
          type="password" 
          name="password" 
          id="password" 
          autoComplete="current-password" 
          required 
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
        />
      </div>
    </div>

    <div>
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign up
      </button>
    </div>
  </form>
</div>
</div>
  )
}