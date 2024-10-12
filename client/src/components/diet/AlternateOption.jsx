import React from 'react'
import { Box, Button, Typography } from '@mui/material'

function AlternateOption({ status, handler, options,submit }) {
    return (
        <>
            <Typography align='center' margin={"20px"} fontWeight={"700"} variant='h1'>Pick Meal</Typography>
            <Box className="flex justify-center h-2/3 items-center my-5">
                <div className='flex flex-wrap justify-center items-center p-2' >
                    {options.map((option, index) => {
                        return (
                            <div key={index} className={`w-full    mx-auto bg-whiten ${status == option ? "border-primary" : "border-white"} border-2  rounded-xl  m-2 shadow-md overflow-hidden`} onClick={() => { handler(option) }}>
                                <div className="md:flex md:min-w-2.5">
                                    <div className="md:shrink-0">
                                        <img className="h-32 w-full object-cover md:h-full md:w-32" src={option.image} alt="" />
                                    </div>
                                    <div className="p-4">
                                        <h1 className="block mt-1 text-lg  font-medium text-black ">{option.name}</h1>
                                        <div className="flex gap-4 mt-4">
                                            <div className="text-center">
                                                <p className="text-lg font-semibold">{option.nutrition.calories}</p>
                                                <p className="text-xs text-gray-500">CALORIES</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-lg font-semibold text-green-500">{option.nutrition.protein}</p>
                                                <p className="text-xs text-gray-500">PROTEIN</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-lg font-semibold text-orange-500">{option.nutrition.carbs}</p>
                                                <p className="text-xs text-gray-500">CARBS</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-lg font-semibold text-pink-500">{option.nutrition.fats}</p>
                                                <p className="text-xs text-gray-500">FAT</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        );
                    })}
                            <Button size='large' variant='contained' disabled={status === ""} onClick={()=>{submit(status)}}>Submit</Button>
                </div>
            </Box>
        </>
    )
}

export default AlternateOption