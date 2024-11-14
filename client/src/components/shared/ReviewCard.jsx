import React from 'react'
import Rating from '@mui/material/Rating';
import { useState } from 'react'
import TextField from '@mui/material/TextField';
function ReviewCard({ ques,reviewAns,setReviewAns, flow }) {
    const [rating, setRating] = useState(3);
    console.log(reviewAns);
    console.log(ques);
    function handelChange(event, newValue) {

        console.log( ques.id,event.target.name,newValue);
        // console.log(newValue)
        // setReviewAns();
        // Update the reviewAns state at the index of ques.id
        setReviewAns((prev) => {
            return prev.map((item, idx) => {
                if (item.id === ques.id) {
                    return {
                        ...item,
                        reviewScore: newValue,
                        subQuestions: item.subQuestions.map((subItem, subIdx) => {
                            return {
                                ...subItem,
                                subReviewScore: newValue
                            }
                        })
                    }
                }
                return item;
            })});
    }
    function handleSubRating(event, newValue, index) {
        console.log(event.target.name, newValue);
        // Update the reviewAns state at the index of ques.id and subQuestions[idx]
        setReviewAns((prev) => {
            return prev.map((item) => {
                if (item.id === ques.id) {
                    const updatedSubQuestions = item.subQuestions.map((subItem, subIdx) => {
                        if (subIdx === index) {
                            return {
                                ...subItem,
                                subReviewScore: newValue
                            };
                        }
                        return subItem;
                    });
    
                    // Calculate the average of all subQuestions
                    const getSubQuesAverage = (subQuestions) => {
                        let total = 0;
                        for (let subques of subQuestions) {
                            total += subques.subReviewScore;
                        }
                        return total / subQuestions.length;
                    };
    
                    return {
                        ...item,
                        subQuestions: updatedSubQuestions,
                        reviewScore: getSubQuesAverage(updatedSubQuestions)
                    };
                }
                return item;
            });
        });
    }
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
                            if (prev < 3) {
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
                        name="reviewScore"
                        value={reviewAns[ques.id].reviewScore}
                        onChange={(event, newValue) => {
                            handelChange(event,newValue);
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
                                name="subQuestionText"
                                value={reviewAns[ques.id].subQuestions[idx].subReviewScore}
                                onChange={(event, newValue) => {
                                    handleSubRating(event,newValue,idx);
                                }}
                                classes={{ icon: 'text-3xl' }}
                            />
                        </div>
                    })}
                </div>
            </div>


<TextField
          id="review-box"
          label="Anything to say (Optional)"
          multiline
          rows={6}
          fullWidth
          variant='filled'
        />

        </div>
    )
}

export default ReviewCard