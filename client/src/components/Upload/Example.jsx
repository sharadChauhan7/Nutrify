import React from 'react'
import { Stack, TextField, Fab } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import {setExamples} from '../../Features/ProblemForm/problemSlice.js';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { nanoid } from '@reduxjs/toolkit';

function Example({ problem }) {
    // To handle multiple constrains we are using an object of constraints
    // let example =problem.examples;
    let [ex,setEx]= React.useState(problem.examples);

    let dispatch = useDispatch();
    
    function addExample(){
        if(ex.length>=3) return;
        setEx([...ex,{input:"",output:"",explaination:""}]);
        dispatch(setExamples([...ex,{input:"",output:"",explaination:""}]));
    }
    function removeExample(){
        if(ex.length<=2) return;
        setEx(ex.slice(0,ex.length-1));
        dispatch(setExamples(ex.slice(0,example.l-1)));
    }
    // Handle Example form
    
    function handleExampleChange(e, index, key) {

        setEx()
        // dispatch(setExamples(newEx));
    }

    return (
        <>
        <Stack direction={"row"} justifyContent={"center"} gap={"10px"} alignItems={"center"} className=' py-5 overflow-x-auto' >
            {/* Render Example object */}
            {ex.map((ex, i) => {
                return (
                    <Stack key={nanoid()} id={i} direction={"column"} alignItems={"center"} width={"80%"} className='border-2 p-4'  >
                        {/* Heading example 1*/}
                        <h1 className='text-xl font-medium text-left'>Example {i + 1}</h1>
                        <TextField
                            key={`input-${i}`}
                            id="input"
                            label="Input"
                            variant="outlined"
                            value={ex.input}
                            sx={{width:"100%",margin:"5px 0",border:"none"}}
                            onChange={(e) => handleExampleChange(e, i, 'input')}
                        />
                        <TextField
                        key={`output-${i}`}
                            id="output"
                            label="Output"
                            variant="outlined"
                            value={ex.output}
                            sx={{width:"100%", margin:"5px 0"}}
                            onChange={(e) => handleExampleChange(e, i, 'output')}
                        />
                        <TextField
                            key={`explanation-${i}`}
                            id="explaination"
                            label="Explaination"
                            variant="outlined"
                            value={ex.explaination}
                            sx={{width:"100%",margin:"5px 0"}}
                            onChange={(e) => handleExampleChange(e, i, 'explaination')}
                        />
                    </Stack>
                )
            })}

        </Stack>
            <div className='flex justify-center mt-4 gap-5'>
                <Fab color="secondary" aria-label="add" onClick={removeExample} >
                    <RemoveIcon />
                </Fab>
                <Fab color="secondary" aria-label="add" onClick={addExample}>
                    <AddIcon />
                </Fab>
            </div>
            </>
    )
}

export default Example