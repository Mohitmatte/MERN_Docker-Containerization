import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { ToastContainer } from 'react-toastify';
import { Brain } from 'lucide-react';
import axios from "axios";
// import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
const BACKEND_URL2 = import.meta.env.VITE_BACKEND_URL;

export function Signup() {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate=useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value; // Corrected spelling

        if (!username || !password) {
            alert("Both fields are required.");
            return;
        }

        try {
            await axios.post(`${BACKEND_URL2}/api/v1/signup`, {
                username,
                password,
            });
            alert("You have signed up successfully!");
            navigate("/signin")
            
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Failed to sign up. Please try again.");
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex justify-center items-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <Brain className="h-12 w-12 text-indigo-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
          <p className="mt-2 text-center text-gray-600">
            Start organizing your digital life with Brainly
          </p>
        </div>

        <div className="space-y-4">
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef} placeholder="Password" />

          <div className="flex items-center mb-4">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Privacy Policy
              </a>
            </label>
          </div>

          <Button
            onClick={signup}
            size="md"
            variant="primary"
            text="Create Account"
            fullwidth={true}
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/signin')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
      <ToastContainer position="bottom-right"/>
    </div>
    )
}