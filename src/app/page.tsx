import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <Link href='/login'>Login</Link>
      <Link href='/signup'>Signup</Link>
    </div>
  );
}
