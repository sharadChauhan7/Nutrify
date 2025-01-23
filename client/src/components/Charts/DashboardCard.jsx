import { Add, Edit } from "@mui/icons-material";
import WeightChart from "./WeightChart";
import UpdateDisplay from "./UpdateDisplay";
import { useState } from "react";
const DashboardCard = ({MyChart,chartData,cardData,updateData,type,target=0}) => {
  // console.log(chartData[chartData.length-1].weight)
  console.log(cardData);

  const [update, setUpdate] = useState(false);
  return (
    (chartData.length) && <div className="bg-white h-[60%] shadow-md rounded-2xl p-6 w-full max-w-[1250px] flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
    {/* Left Section */}

    {!update && <div className="flex-1 space-y-4">
      <div>
        <h2 className="text-xl font-bold">{cardData.heading} <span>/</span> <span className="font-medium text-primary focus:underline">{cardData.unit}</span></h2>
      </div>
      <div className="grid grid-cols-3 gap-5  items-center m-2 h-2/6 w-full ">
        <div className="hover:border-gray-200 border-2 p-3 rounded-xl border-white cursor-pointer " onClick={()=>{setUpdate(true)}}>
          <h3 className="text-sm text-gray-500 ">Latest:</h3>
          <p className="text-3xl font-bold">{chartData[chartData.length-1][type]} {cardData.unit}</p>
        </div>
        <div className="  p-3 ">
          <h3 className="text-sm text-gray-500">{chartData[chartData.length-1][type]-(chartData[0][type]|| target)>=0?cardData.difference.add:cardData.difference.sub}</h3>
          <p className="text-3xl font-bold text-primary">{Math.abs(chartData[chartData.length-1][type]-(chartData[0][type]||target))} {cardData.unit}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="hover:border-gray-200  rounded-xl p-2 border-2 border-white cursor-pointer  ">
            <h3 className="text-sm text-gray-500">Goal:</h3>  
            <p className="text-3xl font-bold text-green-600">{target || chartData[0][type] } {cardData.unit}</p>
          </div>
        </div>
      </div>
      <div className="bg-yellow-50 text-primary rounded-md p-3 text-sm">
        <strong>Note:</strong> Update your {cardData.heading} regularly and track your progress.
      </div>
      <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg py-2 px-4 w-full">
        View history
      </button>
    </div>}
    {update && <div className="flex-1 space-y-4">
        <UpdateDisplay cardData={cardData} latest={chartData[chartData.length-1][type]} update={updateData} cancel={()=>{setUpdate(false)}}/>
    </div>}

    {/* Right Section */}
    <div className="flex-1">
      <div className="flex justify-between items-center mb-4">
        {/* <h3 className="font-semibold">YOUR {(cardData.heading).toUpperCase()} (IN {cardData.unit.toUpperCase()}) OVER TIME</h3> */}
        {/* <div className="flex items-center space-x-2">
          <button className="bg-gray-200 rounded-lg px-3 py-1 font-medium">12</button>
          <button className="text-gray-500">month</button>
        </div> */}
      </div> 
      <div className="bg-gray-100 rounded-3xl px-2 h-[95%]">
          <MyChart data={chartData} target={target} />
      </div>

    </div>
  </div>
  );
};

export default DashboardCard;
