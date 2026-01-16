"use client";

import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setRole, setUser } from "@/redux/slices/authSlice";
import UserLayout from "@/components/layout/UserLayout";
import { Input } from "@/components/ui/input";
import AppButton from "@/components/ui/AppButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

type LoginForm = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        id: "1",
        name: "User",
        email: formData.email,
      };

      dispatch(setUser(mockUser));
      dispatch(setRole("user"));
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-md mx-auto p-6 my-16">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Login</h1>
          <p className="text-gray-600 mb-6">
            Welcome back. Please login to continue.
          </p>

          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />

            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <AppButton type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Logging in..." : "Login"}
            </AppButton>
          </form>

          <p className="text-center text-gray-600 mt-6 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-yellow-600 hover:text-yellow-700"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </UserLayout>
  );
};

export default LoginPage;
