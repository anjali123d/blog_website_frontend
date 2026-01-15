import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Select, SelectGroup, SelectLabel } from "../components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setBlog } from "../redux/blogSlice";
import { toast } from "sonner";
import { setLoading } from "../redux/authSlice";
import { Loader2 } from "lucide-react";

const WriteBlog = () => {

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { blog } = useSelector(store => store.blog)
  const { loading } = useSelector(store => store.auth)

  const getSelectedCategory = (value) => {
    setCategory(value)
  }

  const createBlogHandler = async () => {

    const token = localStorage.getItem("token");

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`http://localhost:8000/api/v1/blog/`, { title, category }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      })
      if (res.data.success) {
        if (!blog) {
          dispatch(setBlog([res.data.blog]))
          navigate(`./dashboard/write-blog/${res.data.blog._id}`)
          toast.success(res.data.message)
        }
        dispatch(setBlog([...blog, res.data.blog]))
        navigate(`/dashboard/write-blog/${res.data.blog._id}`)
        toast.success(res.data.message)
      } else {
        toast.error("Somthing went wrong")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Unauthorized");
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="p-4 md:pr-20 h-screen md:ml-[320px] pt-20">
      <Card className="md:p-10 dark:bg-gray-800 -space-y-6">
        <h1 className="text-2xl font-bold">Let's create Blog</h1>
        <p>
          Start your blogging journey today by logging in to your account.
          Create, edit, and manage your blog posts easily in one place. Publish
          engaging content and share your ideas with readers around the world.
          Turn your thoughts into stories that inspire others.
        </p>
        <div className="mt-8">
          <div>
            <Label className="pb-2">Title</Label>
            <Input
              type="text"
              placeholder="Your blog name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white dark:bg-gray-700"
            />
          </div>
          <div className="mt-4 mb-5">
            <Label className="pb-2">Category</Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button disabled={loading} onClick={createBlogHandler}>
              {
                loading ? <><Loader2 className="mr-1 h-4 w-4 animate-spin" />Please wait</> : "Create"
              }
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WriteBlog;
