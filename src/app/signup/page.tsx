"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  console.log(user);

  async function onSignup() {
    const res = await axios.post("/api/users/signup", user);
    console.log(res);
    router.push("/login");
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <label htmlFor='username'>Username</label>
      <input
        className='p-2'
        name='username'
        id='username'
        placeholder='username'
        type='text'
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
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
        type='password'
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className='p-2 border-2 border-red-100 rounded-md hover:cursor-pointer'
        onClick={() => onSignup()}
      >
        Submit
      </button>

      <Link href='/login'>Already have an account? Login</Link>
    </div>
  );
}
