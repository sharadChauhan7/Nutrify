import React from 'react'
import {Link} from 'react-router-dom'
function Medicine() {
  return (
    <div className="flex flex-col justify-center  items-center border-2 w-[40rem] h-[20rem] rounded-3xl bg-gray-100">
        <Link to='/setmedicine' className='text-2xl font-semibold text-gray-700'>Medicine</Link>
    </div>
  )
}

export default Medicine