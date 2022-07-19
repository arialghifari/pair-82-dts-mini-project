import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
    } catch (error) {
      setErrorMessage(`* ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center my-32 gap-10">
      <div className="flex flex-col gap-3 w-full max-w-md">
        <p className="text-2xl mb-4 text-center">REGISTER</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="bg-zinc-900 border border-zinc-500 p-3"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="bg-zinc-900 border border-zinc-500 p-3"
          />

          {errorMessage && <p className="text-red-400">{errorMessage}</p>}
          <button type="submit" className="bg-red-700 p-3">
            Register
          </button>
        </form>
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
