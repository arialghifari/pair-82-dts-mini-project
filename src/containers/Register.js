import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="flex flex-col items-center my-32 gap-10">
      <div className="flex flex-col gap-3 w-full max-w-md">
        <p className="text-2xl mb-4 text-center">REGISTER</p>
        <input
          type="email"
          placeholder="Email"
          className="bg-zinc-900 border border-zinc-500 p-3"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-zinc-900 border border-zinc-500 p-3"
        />
        <button className="bg-red-700 p-3">Register</button>
        <p>
          Already have account?{" "}
          <Link to="/login">
            <u>Login</u>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
