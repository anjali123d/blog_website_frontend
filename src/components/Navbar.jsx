import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChartColumnBig, LogOut, Search, User } from "lucide-react";
import { FaMoon, FaSun } from "react-icons/fa";

// Correct shadcn Avatar import
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

// Use correct image import
import AvatarImg from "../assets/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { toggleTheme } from "../redux/themeSlice";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { LiaCommentSolid } from "react-icons/lia";
import { TfiWrite } from "react-icons/tfi";
import userLogo from "../assets/Profile_photo.png"
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = () => {
  //   const user = true;

  const { user } = useSelector((store) => store.auth);

  const { theme } = useSelector((store) => store.theme);

  const [searchTerm, setSearchTerm] = useState("")

  const [openNav, setOpenNav] = useState(false)

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchTerm.trim() !== ""){
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
      setSearchTerm("")
    }
  }

  const toggleNav = ()=> {
    setOpenNav(!openNav)
  }
 
  const logoutHandler = async (e) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        localStorage.removeItem("token");
        navigate("/");
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0">
        {/* Logo Section */}
        <div className="flex gap-7 items-center">
          <Link to={"/"}>
            <div className="flex gap-2 items-center">
              <h1 className="font-bold text-3xl md:text-4xl">Logo</h1>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e)=> setSearchTerm(e.target.value)}
              className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px]"
            />
            <Button onClick={handleSearch} className="absolute right-0 top-0">
              <Search />
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <nav className="flex md:gap-7 gap-4 items-center">
          <ul className="hidden md:flex gap-7 items-center text-xl font-semibold">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/about"}>
              <li>About</li>
            </Link>
            <Link to={"/blogs"}>
              <li>Blogs</li>
            </Link>
          </ul>

          <div className="flex items-center gap-4">
            <Button onClick={() => dispatch(toggleTheme())}>
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </Button>

            {/* USER LOGGED-IN BLOCK */}
            {user ? (
              <div className="ml-7 flex gap-3 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src={user.photoUrl || userLogo} alt="profile" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=> navigate ('/dashboard/profile')}>
                        <User />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=> navigate ('/dashboard/your-blog')}>
                        <ChartColumnBig />
                        <span>Your Blogs</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=> navigate ('/dashboard/comments')}>
                        <LiaCommentSolid />
                        <span>Comments</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=> navigate ('/dashboard/write-blog')}>
                        <TfiWrite />
                        <span>Write Blogs</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogOut />
                        <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button className="hidden md:block" onClick={logoutHandler}>Logout</Button>
              </div>
            ) : (
              <div className="ml-7 md:flex gap-2">
                <Link to={"/login"}>
                  <Button>Login</Button>
                </Link>
                <Link className="hidden md:block" to={"/signup"}>
                  <Button>Signup</Button>
                </Link>
              </div>
            )}
          </div>
          {
            openNav ? <HiMenuAlt3 onClick={toggleNav} className="w-7 h-7 md:hidden"/> : <HiMenuAlt1 className="w-7 h-7 md:hidden" onClick={toggleNav}/>
          }
        </nav>
        <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} logoutHandler={logoutHandler}/>
      </div>
    </div>
  );
};

export default Navbar;
