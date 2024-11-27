import React, { useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import UpdateButtons from "./UpdateButtons";

const UpdateDisplay = ({update,cancel,latest,cardData}) => {
  const [value,setvalue]=useState(latest);
  return (
    <div className="border rounded-lg p-4 bg-gray-50 h-full  ">
      <div className="flex justify-between items-center mt-10 mb-4">
        <button className="rounded-full bg-gray-200 p-2 hover:bg-gray-300">
          <Remove className="text-gray-700" onClick={()=>{setvalue(prev=>prev-0.5)}}/>
        </button>
        <div className="text-center">
          <p className="text-gray-500 text-sm">Your {cardData.heading}:</p>
          <h2 className="text-4xl font-bold">{value} {cardData.unit}</h2>
        </div>
        <button className="rounded-full bg-gray-200 p-2 hover:bg-gray-300">
          <Add className="text-gray-700" onClick={()=>{setvalue(prev=>prev+0.5)}} />
        </button>
      </div>
      <UpdateButtons update={update} value ={value}cancel={cancel} />
    </div>
  );
};

export default UpdateDisplay;
