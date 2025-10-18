"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabled(false);
    }
  }, [user]);

  async function onSignin() {
    try {
      setLoading(true);
      await axios.post("/api/users/login", user);
      toast.success("Logged in successfully!");
      router.push("/profile");
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <fieldset className='bg-base-200 p-4 border border-base-300 rounded-box w-xs fieldset'>
        <legend className='fieldset-legend'>
          {loading ? "Processing..." : "Login"}
        </legend>

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
          onClick={() => onSignin()}
          className='mt-4 btn btn-neutral'
        >
          Login
        </button>
        <p className='p-2 text-white text-sm text-center'>
          Create an account?{" "}
          <Link className='font-semibold text-green-600' href='/signup'>
            Signup
          </Link>
        </p>
      </fieldset>
    </div>
  );
}
