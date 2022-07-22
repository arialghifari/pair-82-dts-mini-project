import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/firebase";

function Register() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => signInWithPopup(auth, provider);

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
      return user;
    } catch (error) {
      let errMessage = "There was an error";
      const sanitizeErrMsg = error.message.split("/")[1].split(")")[0];

      if (sanitizeErrMsg === "weak-password") {
        errMessage = "Password should be at least 6 characters";
      }

      if (sanitizeErrMsg === "email-already-in-use") {
        errMessage = "Email already in use";
      }

      setErrorMessage(`* ${errMessage}`);
    }
  };

  return (
    <div className="flex flex-col items-center my-32 gap-10">
      <div className="flex flex-col gap-3 w-full max-w-md">
        <p className="text-2xl mb-4 text-center">REGISTER</p>

        <button
          onClick={signInWithGoogle}
          type="submit"
          className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 p-3 rounded-sm flex items-center justify-center gap-3"
        >
          <img src="/ic_google.svg" alt="" className="w-6" />
          Sign Up With Google
        </button>
        <div className="text-center my-6 relative flex justify-center">
          <div className="absolute top-0 left-0 right-0 h-full w-full flex items-center">
            <hr className="w-full border-zinc-500" />
          </div>
          <p className="bg-zinc-900 px-4 z-20 text-zinc-500">or</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="bg-zinc-900 border border-zinc-500 p-3 rounded-sm"
          />
          <div className="relative">
            <input
              type={isPasswordShown ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="bg-zinc-900 border border-zinc-500 p-3 rounded-sm w-full"
            />
            <div className="absolute top-0 right-2 h-full flex items-center">
              <img
                onClick={() => setIsPasswordShown(!isPasswordShown)}
                src={isPasswordShown ? "/ic_eyeoff.svg" : "/ic_eye.svg"}
                alt="hide"
                className="p-2 cursor-pointer bg-zinc-900"
              />
            </div>
          </div>

          {errorMessage && <p className="text-red-400">{errorMessage}</p>}
          <button
            type="submit"
            className="bg-red-700 hover:bg-red-800 p-3 rounded-sm"
          >
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
