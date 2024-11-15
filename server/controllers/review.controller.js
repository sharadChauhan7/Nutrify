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
        res.status(200).json({message:"Review created successfully"});
}

export const getReview = async (req,res)=>{
    let user = req.user;
    let review = await Review.find({user:user});
    res.status(200).json(review);
}