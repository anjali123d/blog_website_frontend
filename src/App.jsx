import React from 'react'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import About from './pages/About'
import Login1 from './pages/Login1'
import Signup from './pages/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import YourBlog from './pages/YourBlog'
import Comments from './pages/Comments'
import WriteBlog from './pages/WriteBlog'
import UpdateBlog from './pages/UpdateBlog'
import BlogView from './pages/BlogView'
import Footer from './components/Footer'
import SearchList from './pages/SearchList'
// import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar /><Home /><Footer /></>
  },
  {
    path: "/blogs",
    element: <><Navbar /><Blogs /><Footer /></>
  },
  {
    path: "/about",
    element: <><Navbar /><About /><Footer /></>
  },
  {
    path: "/search",
    element: <><Navbar /><SearchList /><Footer /></>
  },
  {
    path: "/login",
    element: <><Login1 /></>
  },
  {
    path: "/signup",
    element: <><Signup /></>
  },
  {
    path: "/blogs/:blogId",
    element: <><Navbar /><BlogView /></>
  },
  {
    path: "/dashboard",
    element: <><Navbar /><Dashboard /></>,
    children: [
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "your-blog",
        element: <YourBlog />
      },
      {
        path: "comments",
        element: <Comments />
      },
      {
        path: "write-blog",
        element: <WriteBlog />
      },
      {
        path: "write-blog/:blogId",
        element: <UpdateBlog />
      }
    ]
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      {/* <Toaster richColors position="top-right" /> */}
    </>
  )
}

export default App

