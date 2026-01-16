"use client";

import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setRole, setUser } from "@/redux/slices/authSlice";
import UserLayout from "@/components/layout/UserLayout";
import { Input } from "@/components/ui/input";
import AppButton from "@/components/ui/AppButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

type RegisterForm = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      dispatch(
        setUser({
          id: "1",
          name: formData.name,
          email: formData.email,
        })
      );
      dispatch(setRole("user"));
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-md mx-auto p-6 my-16">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Register
          </h1>
          <p className="text-gray-600 mb-6">
            Create your account to get started.
          </p>

          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Full name"
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Phone number"
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={handleChange}
              required
            />

            <AppButton type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Creating account..." : "Register"}
            </AppButton>
          </form>

          <p className="text-center text-gray-600 mt-6 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-yellow-600 hover:text-yellow-700"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </UserLayout>
  );
};

export default RegisterPage;
