import React, { useState } from "react";
import auth from "../assets/auth.jpg";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ✅ loading state for spinner
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Left Image */}
      <div className="hidden md:block w-1/2">
        <img src={auth} alt="signup" className="h-full w-full object-cover" />
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 p-6">
        <Card className="w-full max-w-md p-6 shadow-xl rounded-2xl dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              Create an Account
            </CardTitle>
            <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
              Enter your details below to create your account
            </p>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* First + Last Name */}
              <div className="flex gap-3">
                <div className="w-1/2">
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    className="mt-1 dark:bg-gray-900 dark:border-gray-700"
                    placeholder="First Name"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/2">
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    className="mt-1 dark:bg-gray-900 dark:border-gray-700"
                    placeholder="Last Name"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  className="mt-1 dark:bg-gray-900 dark:border-gray-700"
                  placeholder="john.doe@example.com"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password With Eye */}
              <div>
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a Password"
                    className="mt-1 pr-10 dark:bg-gray-900 dark:border-gray-700"
                    value={user.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                className="w-full bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 text-white"
                disabled={loading}
                type="submit"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please wait...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>

              {/* Login Link */}
              <p className="text-center text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="underline hover:text-black dark:hover:text-white"
                >
                  Sign in
                </Link>
              </p>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
