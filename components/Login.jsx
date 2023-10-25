"use client";
import React, { useRef } from "react";
import InputBox from "./InputBox";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const email = useRef("");
  const { data: session } = useSession();
  //const password = useRef("");
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await signIn("email", {
        email: email.current,
        //password: password.current,
        redirect: false,
      });
      window.alert("E-Mail wurde erfolgreich gesendet.");
      if (!res?.error) {
        router.push("http://localhost:3000");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (session && session.user) {
    return (
      <div>
        <h1>Welcome {session.user.email}</h1>
      </div>
    );
  }
  return (
    <div>
      <div className="bg-gradient-to-b  from-slate-50 to-slate-200 p-2 text-center text-slate-600">
        Login Form
      </div>
      <form onSubmit={onSubmit} className="p-2 flex flex-col gap-3">
        <InputBox
          name="username"
          labelText="User Name"
          onChange={(e) => (email.current = e.target.value)}
        />
        {/* <InputBox
          name="password"
          type="password"
          labelText="Password"
          onChange={(e) => (password.current = e.target.value)}
        /> */}
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
