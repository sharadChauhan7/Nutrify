import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { togglewebcam, capture } from "../../features/Webcam/webcamSlice";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ChooseImage from "./ChooseImage";
import { width } from "@mui/system";
import Loader from "../home/loaders";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Webcam from "./webcam";

function Camera({ webcam }) {
    const webcamRef = React.useRef(null);
    const dispatch = useDispatch();
    const { iswebcam, imgSrc } = useSelector((state) => state.webcam);

    const [calorieStatus, setcalorieStatus] = React.useState({
        calorie: 500,
        calorie_target: 2250,
        proteins: 13,
        proteins_target: 112.5,
        carbs: 60,
        carbs_target: 281,
        fats: 10,
        fats_target: 75,
        fiber: 8,
        fiber_target: 30,
    });

    const box1 = (
        <div className="web flex flex-col justify-center  items-center border-2 w-[35rem] h-[20rem] rounded-3xl bg-gray-100">
            <div className="flex justify-between px-4 items-center w-full h-1/2">
                {/* Circulat loader */}
                <div className="border-4 border-yellow-400 rounded-full p-2">
                    <LocalDiningIcon sx={{ fontSize: "3rem" }} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-700">
                        {calorieStatus.calorie} of {calorieStatus.calorie_target}
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
                        (calorieStatus.proteins * 100) / calorieStatus.proteins_target
                    )}
                />
                <Loader
                    label="Carbs"
                    percentage={Math.floor(
                        (calorieStatus.carbs * 100) / calorieStatus.carbs_target
                    )}
                />
                <Loader
                    label="Fats"
                    percentage={Math.floor(
                        (calorieStatus.fats * 100) / calorieStatus.fats_target
                    )}
                />
                <Loader
                    label="Fiber"
                    percentage={Math.floor(
                        (calorieStatus.fiber * 100) / calorieStatus.fiber_target
                    )}
                />
            </div>
        </div>
    );

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
                <div>
                    <Button
                        variant="contained"
                        sx={{ margin: "0 1rem" }}
                        onClick={() => {
                            dispatch(togglewebcam());
                        }}
                    >
                        Take Pic
                    </Button>
                    <Button variant="contained" sx={{ margin: "0 1rem" }}>
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
