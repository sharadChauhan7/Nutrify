import React from 'react'

function preview({ property }) {
    console.log(property.photos);
    return (
        <div className="grid grid-rows-4 grid-flow-col gap-2 h-[50vh] w-[80vw] rounded-3xl border-2 overflow-hidden">
            <img src={property.photos.photo1} className=" row-span-4 h-full w-full object-cover mr-1" alt="image currupted" />

            <img src={property.photos.photo2} className="h-full row-span-2  w-full object-cover " alt="image currupted" />
            <img src={property.photos.photo3} className="h-full row-span-2  w-full object-cover "alt="image currupted" />
            <img src={property.photos.photo4} className="h-full row-span-2  w-full object-cover "alt="image currupted" />
            <img src={property.photos.photo5} className="h-full row-span-2  w-full object-cover "alt="image currupted" />
        </div>
    )
}

export default preview