"use client";
import React, { useRef } from "react";
import InputBox from "./InputBox";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const userName = useRef("");
  const password = useRef("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username: userName.current,
      password: password.current,
      redirect: false,
    });

    if (!res?.error) {
      router.push("http://localhost:3000");
    }
  };
  return (
    <div>
      <div className="bg-gradient-to-b  from-slate-50 to-slate-200 p-2 text-center text-slate-600">
        Login Form
      </div>
      <form onSubmit={onSubmit} className="p-2 flex flex-col gap-3">
        <InputBox
          name="username"
          labelText="User Name"
          onChange={(e) => (userName.current = e.target.value)}
        />
        <InputBox
          name="password"
          type="password"
          labelText="Password"
          onChange={(e) => (password.current = e.target.value)}
        />
        <div className="flex items-center justify-center mt-2 gap-2">
          <button type="submit" className="w-28">
            Sign In
          </button>
          <Link
            href={"/"}
            className="w-28 border border-red-600 text-center py-2 rounded-md text-red-600 transition hover:bg-red-600 hover:text-white hover:border-transparent active:scale-95"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
