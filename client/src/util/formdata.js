export default ["What is your Gender?","Do you have any of below problem's", "How old are You","How active are You?","How much do you weight","How much are you aiming for.","How Fast you want to reach Your goal.","How tall are You" ];

export const common_disease = ["None","Diabetes","Depression","Anxiety disorders","Kidney disease","Obesity", "Heart disease","Cancer","Stroke","Asthma","Liver disease","Hypertension",];

export const daily_activity=["Little or No Activity","Lightly Active","Moderately Active","Super Active"];

export const daily_activity_discription=["Mostly sitting or lying down, with little to no exercise","Light exercise or sports 1-2 days a week","Moderate exercise or sports 3-5 days a week","Hard exercise or sports 6-7 days a week"];

export const goal_target = ["0.25 Kg per week","0.40 Kg per week","0.50 Kg per week","0.65 Kg per week"];

export const goal_target_discription = ["Light exercise or sports 1-2 days a week","Moderate exercise or sports 3-5 days a week","Hard exercise or sports 6-7 days a week","Very hard exercise or a physical job"];

export const medQuestions = ['What med would you like to take?','What form is the med?','Waht are you taking it for','How many times a day?','How many days?','How many pills?','Any special instructions?'];

export const medType = ['Tablet','Capsule','Syrup','Injection','Cream','Ointment','Drops','Inhaler'];

export const diteType= {
  question:"What is yor preffered dite",
  name:"diteType",
  values:[
    {
      title: 'Vegiterian',
      image: 'https://plus.unsplash.com/premium_photo-1679231521293-e13146411fb2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D',
      description: 'Only plant base products and Vegitable.'
    },
    {
      title: 'Non-Vegiterian',
      image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5vbiUyMHZlZyUyMGZvb2R8ZW58MHx8MHx8fDA%3D',
      description: 'Can eat meat and other non-vegiterian products.'
    },
    {
      title: 'Vegan',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmVnYW58ZW58MHx8MHx8fDA%3D',
      description: 'Only plant base products. No animal products.'
    },
    {
      title: 'Eggiterian',
      image: 'https://plus.unsplash.com/premium_photo-1706476075170-32564bc1bcfe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWdnZXRhcmlhbnxlbnwwfHwwfHx8MA%3D%3D',
      description: 'Can eat eggs and other non-vegiterian products.'
    },
  ]
}

export const alergies = {
  question:"Do you have any Food Allergies?",
  name:"foodAllergies",
  values:[
    {
      title:"None",
      image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmVnYW58ZW58MHx8MHx8fDA%3D",
      description:"No food allergies",
    },
    {
      title:"Dairy",
      image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmVnYW58ZW58MHx8MHx8fDA%3D",
      description:"Allergic to dairy products",
    },
    {
      title:"Gluten",
      image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmVnYW58ZW58MHx8MHx8fDA%3D",
      description:"Allergic to gluten products",
    },
    {
      title:"Nuts",
      image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmVnYW58ZW58MHx8MHx8fDA%3D",
      description:"Allergic to nuts",
    },
    {
      title:"Soy",
      image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmVnYW58ZW58MHx8MHx8fDA%3D",
      description:"Allergic to soy products",
    },
    {
      title:"Lactose",
      image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmVnYW58ZW58MHx8MHx8fDA%3D",
      description:"Allergic to lactose products",
    }

  ]};

  export const dite_preference = {
    question:"What cuisines should we include.?",
    name:"ditePreference",
    values:[{
      title:"North Indian",
      image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bm9ydGglMjBpbmRpYW4lMjBjb25kaXRpb258ZW58MHx8MHx8fDA%3D",
      description:"Roti, Paratha,Sabjis,Rajma...",
    },
    {
      title:"South Indian",
      image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c291dGglMjBpbmRpYW58ZW58MHx8MHx8fDA%3D",
      description:"Dosa, Idli, Sambhar, Vada...",
    },
    {
      title:"Continental",
      image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29udGluZW50YWx8ZW58MHx8MHx8fDA%3D",
      description:"Pasta, Pizza, Burger, Sandwich...",
    },
    {
      title:"Tamilian",
      image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFtaWxpYW58ZW58MHx8MHx8fDA%3D",
      description:"Dosa, Idli, Sambhar, Vada...",
    },]
  }