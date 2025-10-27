"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const { email, password, username } = user;
    setButtonDisabled(!(email && password && username));
  }, [user.email, user.password, user.username]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center py-2 min-h-screen'>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor='username'>username</label>
      <input
        className='mb-4 p-2 border border-gray-300 focus:border-gray-600 rounded-lg focus:outline-none text-black'
        id='username'
        type='text'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='username'
      />
      <label htmlFor='email'>email</label>
      <input
        className='mb-4 p-2 border border-gray-300 focus:border-gray-600 rounded-lg focus:outline-none text-black'
        id='email'
        type='text'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
      />
      <label htmlFor='password'>password</label>
      <input
        className='mb-4 p-2 border border-gray-300 focus:border-gray-600 rounded-lg focus:outline-none text-black'
        id='password'
        type='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
      />
      <button
        onClick={onSignup}
        className='mb-4 p-2 border border-gray-300 focus:border-gray-600 rounded-lg focus:outline-none'
      >
        {buttonDisabled ? "No signup" : "Signup"}
      </button>
      <Link href='/login'>Visit login page</Link>
    </div>
  );
}
