import React, { useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectGroup, SelectLabel } from "../components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { Loader2, Subtitles } from "lucide-react";
import axios from "axios";
import { setLoading } from "../redux/authSlice";
import { toast } from "sonner";
import { setBlog } from "../redux/blogSlice";

const UpdateBlog = () => {
  const editor = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const id = params.blogId
  const {blog, loading} = useSelector(store => store.blog)
  const selectBlog = blog.find(blog => blog._id === id)
  const [content, setContent] = useState(selectBlog.description)
  const [publish, setPublish] = useState(false)
  console.log(params);


  const [blogData, setBlogData] = useState({
    title: selectBlog?.title,
    Subtitle:selectBlog?.Subtitle,
    description: selectBlog?.description,
    category: selectBlog?.category
  })

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setBlogData((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  const selectCategory = (value)=>{
    setBlogData({...blogData, category:value})
  }

  const [previewThumbnail, setPreviewThumbnail] = useState(selectBlog?.thumbnail || null);

const selectThumbnail = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setBlogData((prev) => ({ ...prev, thumbnail: file }));

  const reader = new FileReader();
  reader.onloadend = () => setPreviewThumbnail(reader.result);
  reader.readAsDataURL(file);
};

  // const UpdateBlogHandler = async ()={
  //   const formData = new FormData()
  //   formData.append("title", blogData.title)
  //   formData.append("suntitle", blogData.Subtitle)
  //   formData.append("description", content)
  //   formData.append("category", blogData.category)
  const UpdateBlogHandler = async () => {
  const formData = new FormData();
  formData.append("title", blogData.title);
  formData.append("subtitle", blogData.Subtitle);
  formData.append("description", blogData.description);
  formData.append("category", blogData.category);
    formData.append("file", blogData.thumbnail)
    try{
      dispatch(setLoading(true))
      const res = await axios.put(`http://localhost:8000/api/v1/blog/${id}`, formData, {
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      })
      if(res.data.success){
        toast.success(res.data.message)
      }
    } catch(error) {
      console.log(error);
      
    }finally{
      dispatch(setLoading(false))
    }
  }
  // const [content, setContent] = useState("");

  const tpgglePublishUnpublish = async (action) => {
    try {
      const res = await axios.patch(`http://localhost:8000/api/v1/blog/${id}`, {
        params:{
          action
        },
        withCredentials:true
      })
      if(res.data.success){
        setPublish(!publish)
        toast.success(res.data.message)
        navigate('/dashboard/your-blog')
      } else{
        toast.error("Failed to update")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteBlog = async()=> {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/blog/delete/${id}`, {withCredentials:true})
      if(res.data.success){
        const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id);
        dispatch(setBlog(updatedBlogData))
        toast.success(res.data.message)
        navigate('/dashboard/your-blog')
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went error")
    }
  }


  return (
    <div className="md:ml-[320px] pt-20 px-3 pb-10">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full bg-white dark:bg-gray-800 p-5 -space-y-3">
          <h1 className="text-4xl font-bold">Basic Blog Information</h1>
          <p>Make changes to your blogs here. Click publish when are done</p>
          <div className="space-x-2">
            <Button onClick={()=>tpgglePublishUnpublish(selectBlog.isPublished ? "false":"true")}>
              {
                selectBlog?.isPublished ? "UnPublish" : "Publish"
              }
            </Button>
            <Button onClick={deleteBlog} variant="destructive">Remove blog</Button>
          </div>
          <div className="mt-10">
            <Label className="mb-2">Title</Label>
            <Input
              type="text"
              placeholder="Enter a title"
              name="title"
              value={blogData.title || ""}
              onChange={handleChange}
              className="dark:border-gray-300"
            />
          </div>
          <div className="">
            <Label className="mb-2">Subtitle</Label>
            <Input
              type="text"
              placeholder="Enter a subtitle"
              name="Subtitle"
              value={blogData.Subtitle || ""}
              onChange={handleChange}
              className="dark:border-gray-300"
            />
          </div>
          <div>
            <Label className="mb-2">Description</Label>
            <div className="card">
              <textarea
                name="description"
                value={blogData.description}
                onChange={handleChange} 
                ref={editor}
                className="
                    jodit_toolbar
                      w-full
                      min-h-[150px]
                      resize-none
                      rounded-xl
                      border border-gray-300
                      bg-white dark:bg-gray-800
                      px-4 py-3
                      text-gray-900 dark:text-gray-100
                      placeholder-gray-400
                      focus:outline-none
                      focus:ring-2 focus:ring-gray-300
                      focus:border-gray-300
                      transition
                      duration-200
                    "
                placeholder="Write your Blog..."
              />
              
            </div>
          </div>

          <div>
            <Label className="mb-2">Category</Label>
            <Select
              value={blogData.category}
              onValueChange={selectCategory}
              className="dark:border-gray-300"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Web Development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="Digital Marketing">
                    Digital Marketing
                  </SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2">Thumbnail</Label>
            <Input 
              type="file"
              id="file"
              key={previewThumbnail}
              accept="image/*"
              onChange={selectThumbnail}
              className="w-fit dark:border-gray-300"
            />
            {
              previewThumbnail && (
                <img src={previewThumbnail} className="w-64 my-2" alt="Blog Thumbnail" />
              )
            }
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={()=> navigate(-1)}>Back</Button>
            <Button onClick={UpdateBlogHandler}>
              {
                loading ? <><Loader2 className="mr-2 w-4 h-4 animate-spin" />Please wait</> : "Save"
              }</Button>
            </div>

        </Card>
      </div>
    </div>
  );
};

export default UpdateBlog;
