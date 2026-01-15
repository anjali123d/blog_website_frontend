// import { Avatar, AvatarImage } from "../components/ui/avatar";
// import { Card } from "../components/ui/card";
// import React, { useState } from "react";
// import userLogo from "../assets/Profile_photo.png";
// import { Link } from "react-router-dom";
// import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
// import { Label } from "../components/ui/label";
// import { Button } from "../components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../components/ui/dialog";
// import { Input } from "../components/ui/input";
// import { Textarea } from "../components/ui/textarea";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading, setUser } from "../redux/authSlice";
// import axios from "axios";
// import { toast } from "sonner";

// const Profile = () => {
//   const { user } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const [input, setInput] = useState({
//     firstName: user?.firstName,
//     lastName: user?.lastName,
//     occupation: user?.occupation,
//     bio: user?.bio,
//     facebook: user?.facebook,
//     linkedin: user?.linkedin,
//     github: user?.github,
//     instagram: user?.instagram,
//     file: user?.photoUrl
//   })

//   const changeEventHandler = (e)=>{
//     const {name, value} = e.target;
//     setInput((prev)=>({
//       ...prev,
//       [name] : value
//     }))
//   }


//   const changeFileHandler = (e)=>{
//     setInput({...input, file:e.target.files?.[0]})
//   }


//   const submitHandler = async (e) =>{
//     e.preventDefault()

//     const formData = new FormData();
//     formData.append("firstName", input.firstName);
//     formData.append("lastName", input.lastName);
//     formData.append("bio", input.bio);
//     formData.append("occupation", input.occupation);
//     formData.append("facebook", input.facebook);
//     formData.append("linkedin", input.linkedin);
//     formData.append("github", input.github);
//     formData.append("instagram", input.instagram);
//     if(input?.file){
//       formData.append("file", input?.file);
//     }


//     console.log(input);
//     try {
//       dispatch(setLoading(true))
//       const res = await axios.put(`http://localhost:8000/api/v1/user/profile/update`, formData, {
//         headers:{
//           "Content-Type":"multipart/form-data"
//         },
//         withCredentials:true
//       })
//       if(res.data.success){
//         toast.success(res.data.message)
//         dispatch(setUser(res.data.user))
//       }
//     } catch (error) {
//       console.log(error)

//     } finally{
//       dispatch(setLoading(false))
//     }
//   }

//   return (
//     <div className="pt-20 md:ml-[320px] md:h-screen">
//       <div className="max-w-6xl mx-auto mt-8">
//         <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
//           {/* image section */}
//           <div className="flex flex-col items-center justify-center md:w-[400px]">
//             <Avatar className="w-40 h-40 border-2">
//               <AvatarImage src={user.photoUrl || userLogo} />
//             </Avatar>
//             <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3">
//               {user.occupation || "Mern Stack Developer"}
//             </h1>
//             <div className="flex gap-4 items-center">
//               <Link>
//                 <FaFacebook className="w-6 h-6 text-gray-800 dark:text-gray-300" />
//               </Link>
//               <Link>
//                 <FaLinkedin className="w-6 h-6 text-gray-800 dark:text-gray-300" />
//               </Link>
//               <Link>
//                 <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-300" />
//               </Link>
//               <Link>
//                 <FaInstagram className="w-6 h-6 text-gray-800 dark:text-gray-300" />
//               </Link>
//             </div>
//           </div>

//           {/* Informetion section */}
//           <div>
//             <h1 className="font-bold text-center md:text-start text-4xl md-7">
//               Welcome {user.firstName || "User"} !
//             </h1>
//             <p>
//               <span className="font-semibold">Email : </span>
//               {user.email}
//             </p>
//             <div className="flex flex-col gap-2 items-start justify-start my-5 ">
//               <Label>About Me</Label>
//               <p className="border dark:border-gray-600 rounded-lg p-6">
//                 {user.bio ||
//                   `I am a Computer Engineering student with a strong interest in
//   web development, passionate about building clean, modern, and
//   user-friendly applications. I enjoy learning new technologies,
//   improving my coding skills, and turning ideas into real-world
//   projects through efficient and scalable code.`}
//               </p>
//             </div>

//             <Dialog>
//               <form>
//                 <DialogTrigger asChild>
//                   <Button>Edit Profile</Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-[425px]">
//                   <DialogHeader>
//                     <DialogTitle className="text-center">
//                       Edit profile
//                     </DialogTitle>
//                     <DialogDescription className="text-center">
//                       Make changes to your profile here.
//                     </DialogDescription>
//                   </DialogHeader>
//                   <div className="grid gap-4">
//                     <div className="flex gap-2">
//                       <div className="grid gap-3">
//                         <Label htmlFor="name-1">Frist Name</Label>
//                         <Input
//                           id="First Name"
//                           name="firstName"
//                           placeholder="First Name"
//                           className="col-span-3 text-gray-500"
//                           type="text"
//                           value={input.firstName}
//                           onChange = {changeEventHandler}
//                         />
//                       </div>

//                       <div className="grid gap-3">
//                         <Label htmlFor="name-1">Last Name</Label>
//                         <Input
//                           id="Last Name"
//                           name="lastName"
//                           placeholder="Last Name"
//                           className="col-span-3 text-gray-500"
//                           type="text"
//                           value={input.lastName}
//                           onChange = {changeEventHandler}
//                         />
//                       </div>
//                     </div>

//                     <div className="flex gap-2">
//                       <div className="grid gap-3">
//                         <Label htmlFor="username-1">Facebook</Label>
//                         <Input
//                           id="Facebook"
//                           name="facebook"
//                           placeholder="Enter a URL"
//                           className="col-span-3 text-gray-500"
//                           type="text"
//                           value={input.facebook}
//                           onChange = {changeEventHandler}
//                         />
//                       </div>

//                       <div className="grid gap-3">
//                         <Label htmlFor="username-1">Instagram</Label>
//                         <Input
//                           id="Instagram"
//                           name="instagram"
//                           placeholder="Enter a URL"
//                           className="col-span-3 text-gray-500"
//                           type="text"
//                           value={input.instagram}
//                           onChange = {changeEventHandler}
//                         />
//                       </div>
//                     </div>

//                     <div className="flex gap-2">
//                       <div className="grid gap-3">
//                         <Label htmlFor="username-1">Linkedin</Label>
//                         <Input
//                           id="Linkedin"
//                           name="linkedin"
//                           placeholder="https://www.linkedin.com"
//                           className="col-span-3 text-gray-500"
//                           type="text"
//                           value={input.linkedin}
//                           onChange = {changeEventHandler}
//                         />
//                       </div>

//                       <div className="grid gap-3">
//                         <Label htmlFor="username-1">Github</Label>
//                         <Input
//                           id="Github"
//                           name="github"
//                           placeholder="https://github.com/name/"
//                           className="col-span-3 text-gray-500"
//                           type="text"
//                           value={input.github}
//                           onChange = {changeEventHandler}
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <Label className="text-right mb-2">Description</Label>
//                       <Textarea
//                         className="col-span-3 text-gray-500 "
//                         placeholder="Enter a description"
//                         id="bio"
//                         name="bio"
//                         value={input.bio}
//                         onChange = {changeEventHandler}
//                       />
//                     </div>
//                     <Label className="text-right mb-2">Picture</Label>
//                     <Input
//                       id="file"
//                       name="file"
//                       type="file"
//                       accept="image/*"
//                       className="w-[277px]"
//                       onChange = {changeFileHandler}
//                     />
//                     <div></div>
//                   </div>
//                   <DialogFooter>
//                     <DialogClose asChild>
//                       <Button variant="outline">Cancel</Button>
//                     </DialogClose>
//                     <Button onClick={submitHandler} type="submit">Save changes</Button>
//                   </DialogFooter>
//                 </DialogContent>
//               </form>
//             </Dialog>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Profile;








import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Card } from "../components/ui/card";
import React, { useState } from "react";
import userLogo from "../assets/Profile_photo.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import TotalProperty from "../components/TotalProperty";



const Profile = () => {
  const { user, loading } = useSelector((store) => store.auth);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const [input, setInput] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    occupation: user?.occupation || "",
    bio: user?.bio || "",
    facebook: user?.facebook || "",
    linkedin: user?.linkedin || "",
    github: user?.github || "",
    instagram: user?.instagram || "",
    file: null,
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const changeFileHandler = (e) => {
    setInput((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      if (input[key]) {
        formData.append(key, input[key]);
      }
    });

    try {
      dispatch(setLoading(true));

      const res = await axios.put(
        "http://localhost:8000/api/v1/user/profile/update",
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setOpen(false)
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="pt-20 md:ml-[320px] md:h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">

          {/* Avatar */}
          <div className="flex flex-col items-center md:w-[400px]">
            <Avatar className="w-40 h-40 border-2">
              <AvatarImage src={user?.photoUrl || userLogo} />
            </Avatar>

            <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3">
              {user?.occupation || "MERN Stack Developer"}
            </h1>

            <div className="flex gap-4 items-center">
              <Link>
                <FaFacebook className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
              <Link>
                <FaLinkedin className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
              <Link>
                <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
              <Link>
                <FaInstagram className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
            </div>

            <div className="flex gap-4">
              {user?.facebook && <a href={user.facebook} target="_blank"><FaFacebook /></a>}
              {user?.linkedin && <a href={user.linkedin} target="_blank"><FaLinkedin /></a>}
              {user?.github && <a href={user.github} target="_blank"><FaGithub /></a>}
              {user?.instagram && <a href={user.instagram} target="_blank"><FaInstagram /></a>}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="font-bold text-4xl">
              Welcome {user?.firstName || "User"}!
            </h1>

            <p>
              <span className="font-semibold">Email:</span> {user?.email}
            </p>

            <div className="my-5">
              <Label className="pb-3">About Me</Label>
              <p className="border rounded-lg p-6">
                {user?.bio || "No bio added yet"}
              </p>
            </div>

            {/* Edit Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
              
                <Button onClick={()=>setOpen(true)}>Edit Profile</Button>
              

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Update your personal details
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={submitHandler} className="grid gap-4">
                  <div className="flex gap-2">
                    <Input name="firstName" value={input.firstName} onChange={changeEventHandler} placeholder="First Name" />
                    <Input name="lastName" value={input.lastName} onChange={changeEventHandler} placeholder="Last Name" />
                  </div>

                  <Input name="occupation" value={input.occupation} onChange={changeEventHandler} placeholder="Occupation" />
                  <Input name="facebook" value={input.facebook} onChange={changeEventHandler} placeholder="Facebook URL" />
                  <Input name="instagram" value={input.instagram} onChange={changeEventHandler} placeholder="Instagram URL" />
                  <Input name="linkedin" value={input.linkedin} onChange={changeEventHandler} placeholder="LinkedIn URL" />
                  <Input name="github" value={input.github} onChange={changeEventHandler} placeholder="GitHub URL" />

                  <Textarea name="bio" value={input.bio} onChange={changeEventHandler} placeholder="Bio" />

                  <Input type="file" accept="image/*" onChange={changeFileHandler} />

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={submitHandler} >
                        {
                          loading ? (
                            <>
                              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                              please wait
                            </>
                          ) : ("Save Changes")
                        }
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>
      <TotalProperty />
    </div>
  );
};

export default Profile;
