import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { togglewebcam, capture } from "../../features/Webcam/webcamSlice";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ChooseImage from "./ChooseImage";
import { width } from "@mui/system";
import axios from "axios";
import Loader from "./loaders";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Webcam from "./webcam";
import { resizeImage, getMealStatus } from '../../util/methods'
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
function Camera({ userStatus ,triggerModal}) {
    const [isLoading,setIsLoading] = React.useState(false);
    const dispatch = useDispatch();
    const [refreshTrigger, setRefreshTrigger] = React.useState(false);
    const { iswebcam, imgSrc } = useSelector((state) => state.webcam);
    const refreshData = () => {
        setRefreshTrigger(!refreshTrigger); 
    };
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
                setIsLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}calorie/getMeals/today`, {
                    withCredentials: true,
                });
            
                const todaysMeals = response.data[0];

                console.log(todaysMeals);
                const mealStatus = getMealStatus(todaysMeals);
                todaysMeals?mealStatus.total_calories = todaysMeals.total_calories:mealStatus.total_calories = 0;
                console.log(mealStatus);

                if (response.status === 200) {
                    setcalorieStatus(mealStatus);
                    setIsLoading(false);
                }
            } catch (e) {
                console.log(e);
            }
        }
        getMeals();
    }, [setcalorieStatus,refreshTrigger]);
    // console.log(calorieStatus);
    const nutrients = [
        { label: 'Proteins', value: calorieStatus.protein, max: userStatus.macros.protein, unit: 'g' },
        { label: 'Carbs', value: calorieStatus.carbs, max: userStatus.macros.carbs, unit: 'g' },
        { label: 'Fats', value: calorieStatus.fats, max: userStatus.macros.fats, unit: 'g' },
        { label: 'Fiber', value: calorieStatus.fiber, max: userStatus.macros.fiber, unit: 'g' },
    ];

    const box1 = (
        <div className="web flex flex-col justify-center  items-center  w-[35rem] h-[20rem]  shadow-2xl border-2 border-gray-300 rounded-3xl bg-gray-200">
            {isLoading?<Skeleton variant="rectangular" sx={{bgcolor: 'grey.600',width:'100%', height:'100%',borderRadius:'25px'}} />:
            <div >
                <div className="flex justify-between px-4 items-center w-full h-1/2">
                    {/* Circulat loader */}
                    <div className="border-4 border-yellow-400 rounded-full p-2">
                        <LocalDiningIcon sx={{ fontSize: "3rem" }} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-700">
                            {calorieStatus.total_calories} of {userStatus.target_calories}
                        </h1>
                        <p className="font-bold text-gray-500">Cal Eaten</p>
                    </div>
                    <div className="flex gap-5">
                        <Button
                            className=" rounded-full mt-10"
                            variant="contained"
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(togglewebcam());
                            }}
                        >
                            <PhotoCamera />
                        </Button>
                        <div onClick={(e)=>{e.stopPropagation()}} >
                            <ChooseImage />
                        </div>
                    </div>
                </div>
                {/* Nutritions dashboard */}
                <div className="h-1/2 flex flex-wrap gap-4 justify-between px-6 items-center py-6 ">
                    {nutrients.map((nutrient, index) => (
                        <Loader
                            key={index}
                            label={nutrient.label}
                            percentage={Math.floor((nutrient.value * 100) / nutrient.max)}
                            val={`${nutrient.value}${nutrient.unit}`}
                        />
                    ))}
                </div>
                </div>}
            
            </div>

    );

    async function findCalorie() {
        console.log("Finding calorie");
        console.log(calorieStatus.total_calories);
        setIsLoading(true);
        try {
            const resizedImageBlob = await resizeImage(imgSrc, 800, 600); // Example size, adjust as needed
            const formData = new FormData();
            formData.append('image', resizedImageBlob, 'resized.jpg');
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}calorie/getCalories`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,
            });
            console.log(res.data);
            let description = `Suggestion for ${res.data.warning.foodName} ${res.data.warning.AlternateDescription}`
            triggerModal({open:true,title:'Suggestion',description:description});

            setcalorieStatus(calorieStatus);
            setIsLoading(false);
            if(calorieStatus){
                refreshData();
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const ImageCard = (
        <div className="flex justify-between gap-5 items-center w-[35rem] h-[20rem] p-4 bg-gray-100 rounded-3xl ">
            <div className="w-2/4  flex">
                <img
                    src={imgSrc}
                    alt=""
                    className="h-2xl  object-contain shadow-xl rounded-3xl bg-black"
                />
            </div>
            <div className="w-2/3 h-full  flex flex-col items-center justify-center gap-10 p-4 ">
                <h3 className="text-lg text-gray-700 font-bold text-center">
                    Click on calorie when you are
                    ready or take a differant pic
                </h3>
                <div className="flex">
                    <Button variant="contained" sx={{ margin: "0 1rem"}} onClick={() => { dispatch(togglewebcam());}}>
                        Take Pic
                    </Button>
                    <Button variant="contained" sx={{ margin: "0 1rem" }} onClick={() => { findCalorie(); dispatch(capture(null)); }} >
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
