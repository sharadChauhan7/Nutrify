import React, { useEffect } from 'react'
import ReviewCard from '../components/shared/ReviewCard'
import {ReviewData} from '../util/reviewData'
import axios from 'axios'
import {useState} from 'react'
import DotLoading from '../components/shared/DotLoading'
function Review() {

    let [flow,setFlow] = useState(0);
    let [loading,setLoading] = useState(false);

    let [reviewAns,setReviewAns] = useState(ReviewData.map((item,idx)=>{
        return {
            position: item.id,
            reviewName: item.reviewName,
            reviewScore: 1,
            questionText:item.questionText,
            subQuestions: item.subQuestion.map((subItem,subIdx)=>{
                return {
                    subQuestionText: subItem,
                    subReviewScore: 1
                }
            })
        }
    }));
    console.log(loading);
    async function handleSubmit (finalAns){
        try{
            console.log(finalAns);
            setLoading(true);
            let result = await axios.post('http://localhost:3000/api/review/create',finalAns,{withCredentials:true});
            console.log(result.data);
        // console.log(result.data);
        setLoading(false);
        }
        catch(e){
            console.log(e);
            setLoading(false);
        }
    }
    // useEffect(()=>{
    //     async function getReview(){
    //         setLoading(true)
    //         let result = await axios.get('http://localhost:3000/api/review/',{withCredentials:true});
    //         console.log(result.data);
    //         setLoading(false);
    //         // setReviewAns(result.data);
    //     }
    //     getReview();
    // })


    return (
        <div className='h-screen w-4/5 flex flex-col overflow-auto gap-4 bg-slate-50 p-8'>
            <p className=' font-bold text-5xl'>Review</p>

            <ReviewCard ques={ReviewData[flow]} handleSubmit={handleSubmit} loading={loading} reviewAns={reviewAns} setReviewAns={setReviewAns} flow={setFlow}/>

        </div>
    )

    const val = <div>

    </div>
}

export default Review