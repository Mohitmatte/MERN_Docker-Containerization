import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BACKEND_URL2 = import.meta.env.VITE_BACKEND_URL;
import { Brain } from 'lucide-react';


export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    console.log("Signin url",`${BACKEND_URL2}/api/v1/signin`);
    

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value; 

        if (!username || !password) {
            toast.error("Both fields are required");
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL2}/api/v1/signin`, {
                username,
                password,
            },);
            const jwt = response.data.token;
            console.log(jwt);
            localStorage.setItem("token", jwt);

            //redirect user to dashboard
            toast.success("Signed in succesfully");
            
            navigate("/dashboard");

        } catch (error) {
            console.error("Signup failed:", error);
            alert("Failed to sign up. Please try again.");
        }


    }
    return (
        // <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        //     <div className=" bg-white rounded-xl border min-w-48 p-8">
        //         <Input ref={usernameRef} placeholder="Username" />
        //         <Input ref={passwordRef} placeholder="Password" />

        //         <div className="flex justify-center pt-4">
        //             <Button onClick={signin} size="md" variant="primary" text="Signin" fullwidth={true} loading={false} />
        //         </div>

        //         <div className="flex font-semibold justify-center items-center cursor-pointer" onClick={() => {
        //             navigate("/signup");
        //             }}>Don't have a account <span className=" text-blue-600">&nbsp; Sign up</span>
        //         </div>
        //     </div>
        //     <ToastContainer/>
        // </div>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex justify-center items-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <Brain className="h-12 w-12 text-indigo-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-center text-gray-600">
            Sign in to access your second brain
          </p>
        </div>

        <div className="space-y-4">
        <Input ref={usernameRef} placeholder="Username"/>
        <Input ref={passwordRef} placeholder="Password" />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>

          <Button
            onClick={signin}
            size="md"
            variant="primary"
            text="Sign In"
            loading={false}
            fullwidth={true}
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
    )
}
