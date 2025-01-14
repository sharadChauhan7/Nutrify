import React from 'react'
import TodaysMeal from './TodaysMeal.jsx'

function TodaysDiet({ditePlan}) {
  return (
    <div>
        <p className='text-2xl text-gray-700 font-semibold'>Today's Plan</p>
        <div className='grid grid-cols-4 gap-2 '>
          {ditePlan.planedDite.map((meal, index) => (
            <TodaysMeal key={index} meal={meal} type={index} />
          ))}
        </div>
    </div>
  )
}

export default TodaysDiet