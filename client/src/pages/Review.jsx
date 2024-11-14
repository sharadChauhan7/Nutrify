import React from 'react'
import ReviewCard from '../components/shared/ReviewCard'
import {ReviewData} from '../util/reviewData'
import {useState} from 'react'
function Review() {
    let [flow,setFlow] = useState(0);
    let [reviewAns,setReviewAns] = useState(ReviewData.map((item,idx)=>{
        return {
            id: item.id,
            reviewName: item.reviewName,
            reviewScore: 1,
            subQuestions: item.subQuestion.map((subItem,subIdx)=>{
                return {
                    subQuestionText: subItem,
                    subReviewScore: 1
                }
            })
        }
    }));
    return (
        <div className='h-screen w-4/5 flex flex-col overflow-auto gap-4 bg-slate-50 p-8'>
            <p className=' font-bold text-5xl'>Review</p>
            <ReviewCard ques={ReviewData[flow]} reviewAns={reviewAns} setReviewAns={setReviewAns} flow={setFlow}/>

        </div>
    )

    const val = <div>

    </div>
}

export default Review