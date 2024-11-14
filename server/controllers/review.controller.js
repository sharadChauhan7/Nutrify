import Review from '../modals/review.js';

export const createReview = async (req,res)=>{
    let review = req.body;
    let user = req.user;
    let fullReview  ={};
    fullReview.user = user;
    fullReview.wholeReview = review;
    fullReview.date = new Date(Date.now());
    console.log(fullReview);
    review = new Review(fullReview);
    await review.save();
    setTimeout(()=>{
        res.send("Review Added");
    },1000);
}