import { useState } from "react";
import React from "react";
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
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";

const Login1 = () => {

  const [showPassword, setShowPassword] = useState(false);

  // ✅ Correct spelling: loading
  const { loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ⛔ WRONG: setLoading(true)
      // ✅ CORRECT:
      dispatch(setLoading(true));

      const res = await axios.post(
        `http://localhost:8000/api/v1/user/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log("res.data.token", res.data.token)
        localStorage.setItem("token", res.data.token);
        dispatch(setUser(res.data.user));
        toast.success(res.data.message

        );

        navigate("/");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }

    finally {
      dispatch(setLoading(false));
    }

  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

      <div className="hidden md:block w-1/2">
        <img src={auth} alt="signup" className="h-full w-full object-cover" />
      </div>

      <div className="flex items-center justify-center w-full md:w-1/2 p-6">
        <Card className="w-full max-w-md p-6 shadow-xl rounded-2xl dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              Login into your account
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  className="mt-1 dark:bg-gray-900 dark:border-gray-700"
                  placeholder="Email address"
                  value={input.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your Password"
                    name="password"
                    className="mt-1 pr-10 dark:bg-gray-900 dark:border-gray-700"
                    value={input.password}
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

              <Button type="submit" className="w-full bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 text-white">

                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please wait...
                  </>
                ) : (
                  "Login"
                )}

              </Button>

              <p className="text-center text-gray-600 dark:text-gray-300">
                Don't have an account?
                <Link to="/signup" className="underline"> Sign up </Link>
              </p>

            </form>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default Login1;
