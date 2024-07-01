import React,{ useState } from "react";
import { Typography } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import{setName,setEmail,setPassword,login} from '../../features/User/user'
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Signup_comp({ toggleAuth }) {

const {userInfo} = useSelector((state)=>state.userInfo);
const dispatch = useDispatch();
const navigate = useNavigate();

async function handleSignup(e){
  try{
    e.preventDefault();
    const response = await axios.post('http://localhost:3000/api/auth/signup', 
       userInfo,
      { withCredentials: true } // Important for sending cookies
  );
    if(response.status===200){
      console.log(response.data);
      navigate('/register');
      // dispatch(login());
    }
  }
  catch(e){
    console.log(e);
  }
}
  return (
    <form className="w-full" >
      <div className="flex justify-between">
        <h1 className="text-4xl font-semi-bold mb-5">Signup</h1>
        {/* <Stack position={"relative"} spacing={0} width="3rem">
          <Avatar sx={{ height: "4rem", width: "4rem", objectFit: "cover" }} src={yourAvatar.preview} />
          <IconButton
            sx={{ position: "absolute", bottom: "0", right: "0" ,left:"50px" ,top:"40px",color:"black" }}
            component="label"
          >
            <>
              <CameraAlt />
              <VisuallyHiddenInput
                type="file"
                onChange={yourAvatar.changeHandler}
              />
            </>
          </IconButton>
        </Stack> */}
      </div>
      <p className="mb-6">Welcome! Please enter your details.</p>
      <div className="mb-5">
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="w-full border-b-2  border-gray-300 py-2 focus:outline-none focus:border-blue-500"
          value={userInfo.userName}
          onChange={(e)=>dispatch(setName(e.target.value))}
          required
        />
      </div>
      <div className="mb-5">
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="w-full border-b-2  border-gray-300 py-2 focus:outline-none focus:border-blue-500"
          value={userInfo.email}
          onChange={(e)=>dispatch(setEmail(e.target.value))}
          required
        />
      </div>
      <div className="mb-5">
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full border-b-2 border-gray-300  py-2  focus:outline-none focus:border-blue-500"
          value={userInfo.password}
          onChange={(e)=>dispatch(setPassword(e.target.value))}
          required
        />
      </div>
      <div className="mb-5">
        <button className="w-full bg-black text-xl text-white py-2 rounded-md" onClick={handleSignup} >
          Signup
        </button>
      </div>

      <div className="flex justify-center">
        <p>
          Already have an account?{" "}
          <span
            className="text-blue-500 hover:cursor-pointer"
            onClick={toggleAuth}
          >
            Login
          </span>
        </p>
      </div>
    </form>
  );
}

export default Signup_comp;
