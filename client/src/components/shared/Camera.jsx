import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { togglewebcam, capture } from "../../features/Webcam/webcamSlice";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ChooseImage from "./ChooseImage";
import { width } from "@mui/system";
import axios from "axios";
import Loader from "../home/loaders";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Webcam from "./webcam";

function Camera({userStatus}) {
    const webcamRef = React.useRef(null);
    const dispatch = useDispatch();
    const { iswebcam, imgSrc } = useSelector((state) => state.webcam);

    const [calorieStatus, setcalorieStatus] = React.useState({
        calorie: 500,
        proteins: 13,
        carbs: 60,
        fats: 10,
        fiber: 8,
    });
// UseEffect to get meals
    React.useEffect(() => {
        async function getMeals() {
            try {
                const response = await axios.get("http://localhost:3000/api/user/getMeals", {
                    withCredentials: true,
                });
                
                function sumNutritionalValues(meals) {
                    return meals.reduce((acc, meal) => {
                      acc.calorie += parseFloat(meal.calorie) || 0;
                      acc.carbs += parseFloat(meal.carbs) || 0;
                      acc.fats += parseFloat(meal.fats) || 0;
                      acc.fiber += parseFloat(meal.fiber) || 0;
                      acc.proteins += parseFloat(meal.proteins) || 0;
                      return acc;
                    }, {
                      calorie: 0,
                      carbs: 0,
                      fats: 0,
                      fiber: 0,
                      proteins: 0
                    });
                  }
                const totalData = sumNutritionalValues(response.data);
                if(response.status===200){
                    setcalorieStatus(totalData);
                }
            } catch (e) {
                console.log(e);
            }
        }
        getMeals();
    }, [setcalorieStatus]);

    const box1 = (
        <div className="web flex flex-col justify-center  items-center border-2 w-[35rem] h-[20rem] rounded-3xl bg-gray-100">
            <div className="flex justify-between px-4 items-center w-full h-1/2">
                {/* Circulat loader */}
                <div className="border-4 border-yellow-400 rounded-full p-2">
                    <LocalDiningIcon sx={{ fontSize: "3rem" }} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-700">
                        {calorieStatus.calorie} of {userStatus.target_calories}
                    </h1>
                    <p className="font-bold text-gray-500">Cal Eaten</p>
                </div>
                <div className="flex gap-5">
                    <Button
                        className=" rounded-full mt-10"
                        variant="contained"
                        onClick={() => {
                            dispatch(togglewebcam());
                        }}
                    >
                        <PhotoCamera />
                    </Button>
                    <ChooseImage />
                </div>
            </div>
            {/* Nutritions dashboard */}
            <div className="h-1/2 flex flex-wrap gap-4 justify-between px-6 items-center py-6">
                <Loader
                    label="Proteins"
                    percentage={Math.floor(
                        (calorieStatus.proteins * 100) / 180
                    )}
                    val={calorieStatus.proteins+"g"}
                />
                <Loader
                    label="Carbs"
                    percentage={Math.floor(
                        (calorieStatus.carbs * 100) / 150
                    )}
                    val={calorieStatus.carbs}
                />
                <Loader
                    label="Fats"
                    percentage={Math.floor(
                        (calorieStatus.fats * 100) / 200
                    )}
                    val={calorieStatus.fats+"g"}
                />
                <Loader
                    label="Fiber"
                    percentage={Math.floor(
                        (calorieStatus.fiber * 100) / 50
                    )}
                    val={calorieStatus.fiber}
                />
            </div>
        </div>
    );
    async function resizeImage(imgSrc, maxWidth, maxHeight) {
        return new Promise((resolve, reject) => {
          // Create an Image object
          const img = new Image();
          img.src = imgSrc;
          img.onload = () => {
            // Create a canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
      
            // Calculate the new size
            let width = img.width;
            let height = img.height;
      
            if (width > height) {
              if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
              }
            }
      
            // Set canvas size to the new size
            canvas.width = width;
            canvas.height = height;
      
            // Draw the resized image
            ctx.drawImage(img, 0, 0, width, height);
      
            // Convert canvas to Blob
            canvas.toBlob(resolve, 'image/jpeg', 0.7); // Adjust quality as needed
          };
          img.onerror = reject;
        });
      }

    async function findCalorie(){
        console.log("Finding calorie");
       try{
        const resizedImageBlob = await resizeImage(imgSrc, 800, 600); // Example size, adjust as needed
        const formData = new FormData();
        formData.append('image', resizedImageBlob, 'resized.jpg');
        const res = await axios.post("http://localhost:3000/api/gemini", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
            withCredentials: true,
        });
        console.log(res.data);
        setcalorieStatus(calorieStatus);
       }
       catch(e){
           console.log(e);
       }
    }

    const ImageCard = (
        <div className="flex justify-center gap-5 items-center h-full  bg-gray-100 rounded-3xl ">
            <div className="w-2/3 h-full">
                <img
                    src={imgSrc}
                    alt=""
                    className="h-full w-full object-contain rounded-3xl  bg-black"
                />
            </div>
            <div className="w-1/3 h-full flex flex-col items-center justify-center gap-10 p-4 ">
                <h3 className="text-lg text-gray-700 font-bold text-center">
                    Click on calorie when you are
                    ready or take a differant pic
                </h3>
                <div className="flex">
                    <Button
                        variant="contained"
                        sx={{ margin: "0 1rem" }}
                        onClick={() => {
                            dispatch(togglewebcam());
                        }}
                    >
                        Take Pic
                    </Button>
                    <Button variant="contained" sx={{ margin: "0 1rem" }} onClick={()=>{findCalorie();dispatch(capture(null));} } >
                        Calorie
                    </Button>
                </div>

                <ChooseImage />
            </div>
        </div>
    );

    if (iswebcam) return <Webcam />;
    else if (imgSrc) return ImageCard;
    else return box1;
}

export default Camera;
