import React from 'react'
import DiteModal from '../components/shared/DiteModal'
function Dite() {
    let [modelOpen,setModelOpen]=React.useState(false);
  return (
    <>
    <div className='h-screen flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center w-2/5 gap-5'>
            <h1 className='text-3xl font-bold text-center'>You dont have your dite Plan press below to make one</h1>
            <button className='bg-primary font-bold active:bg-yellow-500 max-w-36 py-5 px-2 rounded-3xl' onClick={()=>{setModelOpen(!modelOpen)}}>
                Create Dite Plan
            </button>
        </div>
    </div>
    <DiteModal val={modelOpen} close={setModelOpen}/>
    </>
    
  )
}

export default Dite