let days =["mon","tue","wed","thu","fri","sat","sun"];

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