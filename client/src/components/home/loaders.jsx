const Loader = ({ label, percentage }) => {
    return (
        <div>
            <h1 className='text-xl font-bold text-gray-700'>{label}: {percentage}%</h1>
            <div className='w-44 h-2 bg-gray-300 rounded-3xl'>
                <div style={{ width: `${percentage}%` }} className='h-full bg-[#ffd60a] rounded-3xl'></div>
            </div>
        </div>
    );
};

export default Loader;
