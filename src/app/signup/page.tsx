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
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setDisabled(false);
    }
  }, [user]);

  async function onSignup() {
    setLoading(true);
    try {
      await axios.post("/api/users/signup", user);
      router.push("/login");
      toast.success("Account created successfully! Please login.");
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        console.log("Error during signup:", error.message);
      } else {
        console.log("An unexpected error occurred during signup.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <fieldset className='bg-base-200 p-4 border border-base-300 rounded-box w-xs fieldset'>
        <legend className='fieldset-legend'>
          {loading ? "Processing..." : "Signup"}
        </legend>

        <label className='label'>Username</label>
        <input
          type='text'
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className='outline-none focus:outline-none focus:ring-0 input'
          placeholder='username'
        />

        <label className='label'>Email</label>
        <input
          type='email'
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className='outline-none focus:outline-none focus:ring-0 input'
          placeholder='Email'
        />

        <label className='label'>Password</label>
        <input
          type='password'
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className='outline-none focus:outline-none focus:ring-0 input'
          placeholder='Password'
        />

        <button
          disabled={disabled}
          onClick={() => onSignup()}
          className='mt-4 btn btn-neutral'
        >
          Signup
        </button>
        <p className='p-2 text-white text-sm text-center'>
          Already have an account?{" "}
          <Link className='font-semibold text-green-600' href='/login'>
            Login
          </Link>
        </p>
      </fieldset>
    </div>
  );
}
