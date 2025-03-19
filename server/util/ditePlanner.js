let days =["mon","tue","wed","thu","fri","sat","sun"];
import axios from 'axios';
export const planDite = (dite)=>{
    let planedDite={};
    for(let i=0;i<days.length;i++){
        planedDite[days[i]]=[dite.breakfast[i%3],dite.lunch[i%3],dite.snacks[i%3],dite.dinner[i%3]];
    }
    let planedcalories=countCalories(planedDite)
    return {planedDite,planedcalories};
}

function countCalories(planedDite){
    let planedCalories={}
    for(let i=0;i<days.length;i++){
        let data ={
            calories:0,
            protein:0,
            carbs:0,
            fats:0,
        }
        for(let j=0;j<4;j++){
            data = {...data,
                calories:data.calories+planedDite[days[i]][j].nutrition.calories*2,
                protein:data.protein+Number(planedDite[days[i]][j].nutrition.protein.slice(0,-1)*2),
                carbs:data.carbs+Number(planedDite[days[i]][j].nutrition.carbs.slice(0,-1)*2),
                fats:data.fats+Number(planedDite[days[i]][j].nutrition.fats.slice(0,-1)*2),
            }
        }
        planedCalories[days[i]]=data;
    }
    return planedCalories;
}
import 'dotenv/config'
export async function setDietImages(diet){
    console.log(diet);
    let idx=0;
    for(let meal of diet.breakfast){
        // Replace the space in name with + for the image search
        let name = meal.name.split(" ").join("+");
        const url = `${process.env.DIET_IMAGE}${name}${process.env.DIET_UTIL}`
        let res =await axios.get(url);
        diet.breakfast[idx].image = res.data.hits[0].largeImageURL;
        idx++;
    }
    idx=0;
    for(let meal of diet.lunch){
        console.log(meal);
        console.log(meal.name);
        let name = meal.name.split(" ").join("+");
        const url = `${process.env.DIET_IMAGE}${name}${process.env.DIET_UTIL}`
        let res =await axios.get(url);
        diet.lunch[idx].image = res.data.hits[0].largeImageURL;
        idx++;
    }
    idx=0;
    for(let meal of diet.snacks){
        console.log(meal.name);
        let name = meal.name.split(" ").join("+");
        const url = `${process.env.DIET_IMAGE}${name}${process.env.DIET_UTIL}`
        let res =await axios.get(url);
        diet.snacks[idx].image = res.data.hits[0].largeImageURL;
        idx++;
    }
    idx=0;
    for(let meal of diet.dinner){
        let name = meal.name.split(" ").join("+");
        const url = `${process.env.DIET_IMAGE}${name}${process.env.DIET_UTIL}`
        let res =await axios.get(url);
        diet.dinner[idx].image = res.data.hits[0].largeImageURL;
        idx++;
    }
    return diet;
}

export async function setAlternateDietImages(diet){
    let idx=0;
    for(let meal of diet){
        // Replace the space in name with + for the image search
        let name = meal.name.split(" ").join("+");
        const url = `${process.env.DIET_IMAGE}${name}${process.env.DIET_UTIL}`
        let res =await axios.get(url);
        diet[idx].image = res.data.hits[0].largeImageURL;
        idx++;
    }
    return diet;
}