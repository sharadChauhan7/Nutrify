import React from 'react'
import { Box, Typography } from '@mui/material'

function DiteOption({ status, handler, options }) {

  return (
    <>
      <Typography align='center' margin={"20px"} fontWeight={"700"} variant='h1'>{options.question}</Typography>
      <Box className="flex justify-center h-2/3 items-center my-5">
        <div className='grid grid-cols-2 gap-4 p-2' >
          {options.values.map((option, index) => {
            return (
              <div key={index} className={`w-full    mx-auto bg-whiten ${typeof status ==="object"? status.includes(option.title)? "border-primary":" border-white" :status==option.title  ? "border-primary":"border-white" } border-2  rounded-xl  m-2 shadow-md overflow-hidden`} onClick={() => { handler(options.name, option.title) }}>
                <div className="md:flex md:min-w-2.5">
                  <div className="md:shrink-0">
                    <img className="h-32 w-full object-cover md:h-full md:w-32" src={option.image} alt="" />
                  </div>
                  <div className="p-4">
                    <h1 className="block mt-1 text-lg  font-medium text-black ">{option.title}</h1>
                    <p className="mt-2 text-slate-500">{option.description}</p>
                  </div>
                </div>
              </div>

            );
          })}
        </div>
      </Box>
    </>
  )
}

export default DiteOption