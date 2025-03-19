import React, { useState } from 'react';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import { toast } from 'sonner';
const RecipieModal = ({data,close,choiceModal}) => {
    const [isloading,setIsloading] = useState(false);

  const handleClose = () => {
    close({open:false,data:null});
  };

  const findAlternative = async()=>{
    try{
        setIsloading(true);
        let result = await axios.post(`${import.meta.env.VITE_SERVER_URL}diet/alternate`,{data},{withCredentials:true});
        console.log(result.data);
            choiceModal({open:true,data:result.data,prevMeal:data});
            setIsloading(false);
            toast.success("Alternatives generated");
            close({open:false,data:null});

    }
    catch(e){
        console.log(e);
        toast.error("Something went wrong");
        setIsloading(false);
    }
  }



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        {isloading ? <Skeleton variant="rectangular" sx={{bgcolor: 'grey.600',width:'576px', height:'30%',borderRadius:'25px'}} />:(
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 relative">
        <button
          className="absolute text-2xl top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Section */}
          <div className="flex-shrink-0">
            <img
              src={data.image}
              alt="Berry Cereal"
              className="rounded-lg w-full h-full object-cover md:w-48"
            />
          </div>

          {/* Content Section */}
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{data.name}</h2>
            </div>

            <div className="flex gap-4 mt-4">
              <div className="text-center">
                <p className="text-lg font-semibold">{data.nutrition.calories}</p>
                <p className="text-xs text-gray-500">CALORIES</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-green-500">{data.nutrition.protein}</p>
                <p className="text-xs text-gray-500">PROTEIN</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-orange-500">{data.nutrition.carbs}</p>
                <p className="text-xs text-gray-500">CARBS</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-pink-500">{data.nutrition.fats}</p>
                <p className="text-xs text-gray-500">FAT</p>
              </div>
            </div>

            <div className="flex flex-wrap mt-6 gap-2">

              <button className="flex-1 bg-gray-200 py-2 rounded-lg text-gray-500 text-sm font-semibold hover:bg-gray-300">
                {data.portionSize}
              </button>
              <button className="flex items-center justify-center bg-pink-200 py-2 px-4 rounded-lg text-pink-500 text-sm font-semibold hover:bg-pink-300">
                ❤️ Like
              </button>
              <button className='min-w-52 flex-1 bg-gray-200 py-2 rounded-lg text-gray-500 text-sm font-semibold hover:bg-gray-300'onClick={findAlternative}>
                Find Alternative
              </button>
            </div>

          </div>
        </div>
      </div>
  )}
    </div>
  );
};

export default RecipieModal;
