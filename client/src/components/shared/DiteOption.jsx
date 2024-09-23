import React from 'react'

function DiteOption({ status, handler }) {
  let options = {
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
      }
    ]
  }
  return (
    <div className='flex flex-wrap flex-col justify-center items-center gap-2' >
      {options.values.map((option, index) => {
        // let style = status == option ? ' border-primary w-1/3 border-4 ' : 'w-1/3 border-4 border-black';
        return (
          <div key={index}  className="max-w-md   mx-auto bg-white rounded-xl shadow-md overflow-hidden md:min-w-2.5 md:max-w-sm" onClick={()=>{handler(options.name,option.title)}}>
            <div className="md:flex md:min-w-2.5">
              <div className="md:shrink-0">
                <img className="h-32 w-full object-cover md:h-full md:w-32" src={option.image} alt="" />
              </div>
              <div className="p-4">
                <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{option.title}</a>
                <p className="mt-2 text-slate-500">{option.description}</p>
              </div>
            </div>
          </div>

        );
      })}
    </div>
  )
}

export default DiteOption