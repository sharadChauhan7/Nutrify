import { useEffect,useState } from "react";
const Loader = ({ label, percentage,val }) => {
    let [style , setStyle] = useState("bg-[#ffd60a]");
    useEffect(()=>{
        if(percentage>95){
            setStyle("bg-red-600");
        }
        else if(percentage>70){
            setStyle("bg-orange-400")
        }
        else{
            setStyle("bg-green-400");
        }
    })
    return (
        <div>
            <h1 className='text-xl font-bold text-gray-700'>{label}: {val}</h1>
            <div className='w-44 h-2 bg-gray-300 rounded-3xl'>
                <div style={{ width: `${percentage<100?percentage:99}%` }} className={`h-full ${style} rounded-3xl`}></div>
            </div>
        </div>
    );
};

export default Loader;
