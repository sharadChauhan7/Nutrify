import { Add, Edit } from "@mui/icons-material";
import WeightChart from "./WeightChart";

const WeightCard = () => {
  return (
    <div className="bg-white h-[60%] shadow-md border-2 rounded-2xl p-6 w-full max-w-[1250px] flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
      {/* Left Section */}
      <div className="flex-1 space-y-4">
        <div>
          <h2 className="text-xl font-bold">Weight</h2>
          <div className="flex items-center space-x-2 text-sm">
            <button className="font-medium text-gray-700 focus:underline">lbs</button>
            <span>/</span>
            <button className="font-medium text-primary focus:underline">kg</button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <div>
            <h3 className="text-sm text-gray-500">Latest:</h3>
            <p className="text-3xl font-bold">58.9 kg</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Gained:</h3>
            <p className="text-3xl font-bold text-primary">3.9 kg</p>
          </div>
          <div className="flex items-center space-x-2">
            <div>
              <h3 className="text-sm text-gray-500">Goal:</h3>
              <p className="text-3xl font-bold text-green-600">60 kg</p>
            </div>
            <button>
              <Edit className="text-gray-500" fontSize="small" />
            </button>
          </div>
        </div>
        <div className="bg-yellow-50 text-primary rounded-md p-3 text-sm">
          <strong>Note:</strong> Update your weight regularly and track your progress.
        </div>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg py-2 px-4 w-full">
          View history
        </button>
      </div>
      {/* Right Section */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">YOUR WEIGHT (IN KG) OVER TIME</h3>
          <div className="flex items-center space-x-2">
            <button className="bg-gray-200 rounded-lg px-3 py-1 font-medium">12</button>
            <button className="text-gray-500">month</button>
          </div>
        </div>
        <div className="bg-gray-100 rounded-3xl pb-4 pt-3 px-2 h-5/6">
            <WeightChart className="" />
        </div>

      </div>
    </div>
  );
};

export default WeightCard;
