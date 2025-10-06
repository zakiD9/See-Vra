import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/AuthStore";
import { useState } from "react";



export default function LoginForm() {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };


  return (
    <div className="flex items-center justify-center text-black min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col text- gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input onChange={(e)=>{setEmail(e.target.value)}} placeholder="example@gmail.com"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Input onChange={(e)=>{setPassword(e.target.value)}} placeholder="********" type="password"/>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <Button>{loading ? "Logging in..." : "Submit"}</Button>
        </form>
      </div>
    </div>
  );
}