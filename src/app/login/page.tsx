"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  async function onSignin() {}

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <label htmlFor='email'>Email</label>
      <input
        className='p-2'
        name='email'
        id='email'
        placeholder='Enter Your Email!'
        type='text'
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor='password'>Password</label>
      <input
        className='p-2'
        name='password'
        id='password'
        placeholder='Enter Your Password!'
        type='text'
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className='p-2 border-2 border-red-100 rounded-md hover:cursor-pointer'
        onClick={() => onSignin()}
      >
        Submit
      </button>

      <Link href='/signup'>Create an account? Signup</Link>
    </div>
  );
}
