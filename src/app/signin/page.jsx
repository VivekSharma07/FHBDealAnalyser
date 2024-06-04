"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }

      try {
        const { user } = await createUserWithEmailAndPassword(email, password);
        await setDoc(doc(db, "users", user.uid), {
          ...user,
        });
        toast.success("You're being redirected", {
          position: "bottom-left",
          autoClose: 2000,
        });
        router.push("/dashboard");
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } else {
      try {
        const signinResp = await signInWithEmailAndPassword(email, password);
        if (!signinResp) {
          throw new Error("Wrong credentials");
        }
        console.log(`signin resp = `, signinResp);
        toast.success("You're being redirected", {
          position: "bottom-left",
          autoClose: 2000,
        });
        router.push("/dashboard");
      } catch (error) {
        toast.error("Invalid email or password", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (isSignUp) {
  //     if (password !== confirmPassword) {
  //       toast.error("Passwords do not match", {
  //         position: "top-center",
  //         autoClose: 3000,
  //       });
  //       return;
  //     }

  //     try {
  //       const { user } = await createUserWithEmailAndPassword(email, password);
  //       await setDoc(doc(db, "users", user.uid), {
  //         ...user,
  //       });
  //       toast.success("You're being redirected", {
  //         position: "bottom-left",
  //         autoClose: 2000,
  //       });
  //       router.push("/dashboard");
  //     } catch (error) {
  //       toast.error(error.message, {
  //         position: "top-center",
  //         autoClose: 3000,
  //       });
  //     }
  //   } else {
  //     try {
  //       await signInWithEmailAndPassword(email, password).then((value)=>{
  //         console.log(`user details = `, value);
  //       })
  //       toast.success("You're being redirected", {
  //         position: "bottom-left",
  //         autoClose: 2000,
  //       });
  //       router.push("/dashboard");
  //     } catch (error) {
  //       console.log(`error in logging in`)
  //       toast.error(error.message, {
  //         position: "top-center",
  //         autoClose: 3000,
  //       });
  //     }
  //   }
  // };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      await setDoc(doc(db, "users", user.uid), {
        ...user,
      });
      toast.success("You're being redirected", {
        position: "bottom-left",
        autoClose: 2000,
      });
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  // ...
  return (
    <div className="min-h-screen flex items-center justify-center bg-background my-5 p-5 ">
      <div className="p-8 rounded-lg shadow-md w-full max-w-md border border-gray-400">
        <div className="flex justify-center items-center p-5 my-4 mx-4 border-b border-gray-400">
          <Image
            src="/Logos/ForeverHomeBuyerLogo.png"
            width={100}
            height={100}
          />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-text">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <label htmlFor="email" className="block mb-2 font-bold text-text">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary text-text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 font-bold text-text"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary text-text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isSignUp && (
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 font-bold text-text"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary text-text"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>

        <p className="flex items-center justify-center my-4 p-2">Need an FHB account? Contact your Developer</p>

        </form>
        {/* <div className="mt-4 text-center">
          <button
            className="text-primary hover:underline focus:outline-none"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div> */}

        {/*Google Sign In Button */}
        {/* <div className="mt-6 flex justify-center">
          <button
            className="bg-white text-text border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 focus:outline-none flex items-center"
            onClick={handleGoogleSignIn}
          >
            <div className="mt-6 flex justify-center">
              <button
                className="bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 focus:outline-none flex items-center"
                onClick={handleGoogleSignIn}
              >
                <svg
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </button>
        </div> */}
      </div>
      <ToastContainer />
    </div>
  );
  // ...
};

export default SignIn;
