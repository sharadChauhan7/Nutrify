import React from "react";

const UpdateButtons = ({update,cancel,value}) => {
  return (
    <div className="space-y-2 ">
      <button className="w-full bg-primary text-gray-700 py-2 rounded-md hover:bg-yellow-400" onClick={()=>{update(value);cancel();}}>
        Update your weight
      </button>
      <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300" onClick={cancel}>
        Cancel
      </button>
    </div>
  );
};

export default UpdateButtons;
