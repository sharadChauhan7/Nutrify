import React from 'react'
import Rating from '@mui/material/Rating';
import { useState } from 'react'
function ReviewCard({ ques, flow }) {
    const [rating, setRating] = useState(3);
    return (
        <div className='h-full w-full border-4 py-10 px-10 rounded-3xl bg-white'>
            <div className='flex justify-between'>
                <p className='text-4xl font-semibold text-gray-600'>{ques.reviewName}</p>
                <div>
                    <button className='text-2xl bg-primary text-gray-700 rounded-xl py-2 px-6 mx-1' onClick={() => {
                        flow(prev => {
                            if (prev > 0) {
                                return prev - 1
                            }
                            return prev;

                        });
                    }}>Prev</button>
                    <button className='text-2xl bg-primary text-gray-700 rounded-xl py-2 px-6 mx-1' onClick={() => {
                        flow(prev => {
                            if (prev < 6) {
                                return prev + 1
                            }
                            return prev;

                        });
                    }}>Next</button>
                </div>
            </div>

            <div className='flex flex-col mx-4'>
                <div className='flex  my-2  py-4 justify-between items-center '>
                    <p className='text-2xl '>{ques.questionText}</p>
                    <Rating
                        name="Main-Rating"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                        classes={{ icon: 'text-5xl' }}
                    />
                </div>
                {/* Sub Question div */}
                <div className=''>
                    <p className='text-3xl font-semibold text-gray-600'>Sub Questions</p>
                    {/* Sub review Question */}
                    {ques.subQuestion.map((subQues, idx) => {
                        return <div className='flex  my-4  py-2 justify-between items-center '>
                            <p className='text-xl '>{subQues}</p>
                            <Rating
                                name="Main-Rating"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                                classes={{ icon: 'text-3xl' }}
                            />
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default ReviewCard