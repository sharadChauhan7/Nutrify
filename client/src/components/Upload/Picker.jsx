import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { next } from '../../features/User/flow'

const Picker = ({userStatus,selections,unit="",dispatcher}) => {
    const dispatch = useDispatch(); // Default value
    const pickerValue = userStatus;
    const handleSelect = (value) => {
        dispatch(dispatcher(value));
        dispatch(next());
    };

    return (
        <>
            <div className=" w-64 shadow-2xl rounded-xl border-2 border-black" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {Object.keys(selections).map((name) => (
                    <div key={name} className="picker-column flex flex-col justify-center items-center">
                        {selections[name].map((option) => (
                            <div
                                key={option}
                                className={`picker-item w-full text-2xl text-center  cursor-pointer ${pickerValue === option ? 'bg-primary hover:bg-primary cursor-pointer text-white' : 'bg-white text-black hover:bg-[#f5e180]'} `}
                                onClick={() => handleSelect(option)}
                                style={{ padding: '10px' }}
                            >
                                {option}{unit}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Picker;