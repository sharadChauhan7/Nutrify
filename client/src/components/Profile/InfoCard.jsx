import React from 'react'

function InfoCard({data,title}) {

    return (
        data && <div className=' h-full w-full  bg-white rounded-3xl py-4 px-10'>
            <div className='flex justify-between items-center'>
                <h1 className='text-4xl font-semibold text-gray-700 '>{title}</h1>
            </div>
            {/* Make a grid to store use overview */}
            <div className='grid grid-cols-2  gap-x-10 gap-y-5  py-10'>
                {Object.keys(data).map((key,index)=>{
                    return(
                        <>
                        <div  className=''>
                            <h1 className='text-xl font-semibold text-gray-700'>{key.toUpperCase()}</h1>
                            <h1 className='text-2xl text-gray-700'>{data[key]}</h1>
                        </div>
                        </>
                    )
                })}


            </div>
        </div>
    )
}

export default InfoCard