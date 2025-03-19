export default ["What is your Gender?", "How old are You","How active are You?","How much do you weight","How much are you aiming for.","How Fast you want to reach Your goal.","How tall are You" ];

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
      image:"https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG5vJTIwZm9vZCUyMGFsZXJnaWVzfGVufDB8fDB8fHww",
      description:"No food allergies",
    },
    {
      title:"Dairy",
      image:"https://media.istockphoto.com/id/544807136/photo/various-fresh-dairy-products.webp?a=1&b=1&s=612x612&w=0&k=20&c=M79U7Z-a-kjb_EkbmPsw8lqv16QwOL3T1uUJFj88qkQ=",
      description:"Allergic to dairy products",
    },
    {
      title:"Gluten",
      image:"https://images.unsplash.com/photo-1585220177022-3fdf02bd9da0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdsdXRlbnxlbnwwfHwwfHx8MA%3D%3D",
      description:"Allergic to gluten products",
    },
    {
      title:"Nuts",
      image:"https://media.istockphoto.com/id/178135187/photo/nuts-mixture.webp?a=1&b=1&s=612x612&w=0&k=20&c=skYA8Fr4xUf8olf9BnaMsTfFEV2cDBOQMTyYv8HBQL0=",
      description:"Allergic to nuts",
    },
    {
      title:"Soy",
      image:"https://images.unsplash.com/photo-1582581720432-de83a98176ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c295JTIwc2F1Y2V8ZW58MHx8MHx8fDA%3D",
      description:"Allergic to soy products",
    },
    {
      title:"Lactose",
      image:"https://plus.unsplash.com/premium_photo-1663126462918-89b37026420b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGFjdG9zZXxlbnwwfHwwfHx8MA%3D%3D",
      description:"Allergic to lactose products",
    }

  ]};

  export const dite_preference = {
    question:"What cuisines should we include.?",
    name:"ditePreference",
    values:[{
      title:"North Indian",
      image:"https://plus.unsplash.com/premium_photo-1700752342459-c276465c177e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bm9ydGglMjBpbmRpYW4lMjBmb29kfGVufDB8fDB8fHww",
      description:"Roti, Paratha,Sabjis,Rajma...",
    },
    {
      title:"South Indian",
      image:"https://plus.unsplash.com/premium_photo-1664702602982-7eab3da92601?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNvdXRoJTIwaW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D",
      description:"Dosa, Idli, Sambhar, Vada...",
    },
    {
      title:"Continental",
      image:"https://images.unsplash.com/photo-1634629377376-6c6bae2d8bcf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29udGluZW50YWwlMjBmb29kfGVufDB8fDB8fHww",
      description:"Pasta, Pizza, Burger, Sandwich...",
    },
    {
      title:"Tamilian",
      image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFtaWxpYW58ZW58MHx8MHx8fDA%3D",
      description:"Dosa, Idli, Sambhar, Vada...",
    },]
  }