import { Box, Stack, TextField } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setConstraints } from '../../Features/ProblemForm/problemSlice.js'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import RemoveIcon from '@mui/icons-material/Remove';

function Constraints({problem}) {
  // To handle multiple constrains we are using an object of constraints
  let [constraint,setConstraint]=React.useState(problem.constraints);
  
  let dispatch=useDispatch();
  // Handle change in constraints
  function handleChange(event){
    let newConstraint={...constraint};
    newConstraint[event.target.name]=event.target.value;
    setConstraint(newConstraint);
    dispatch(setConstraints(newConstraint));
  }


//  Add and remove constraints
  function addConstraint(){
    let length=Object.keys(constraint).length;
    if(length==5){
      return;
    }
    let newConstraint={...constraint};
    newConstraint[`Constraint ${length+1}`]="";
    setConstraint(newConstraint);
    dispatch(setConstraints(newConstraint));

  }
  function removeConstraint(){
    let length=Object.keys(constraint).length;
    let newConstraint={...constraint};
    delete newConstraint[`Constraint ${length}`];
    setConstraint(newConstraint);
    dispatch(setConstraints(newConstraint));
  }
  return (
    <Stack justifyContent={"center"} gap={"20px"} alignItems={"center"} >
      {/* Render constraints object */}
      {Object.keys(constraint).map((key,index)=>{
        return(
          <Box key={index} sx={{width:"80%"}}>
            <TextField id="standard-basic" label={key} variant="standard" name={`${key}`} value={constraint[key]} onChange={handleChange} sx={{width:"100%"}} />
          </Box>
        )
      }
      )}
      <div className=' flex gap-5'>
      <Fab color="secondary" aria-label="add" onClick={removeConstraint}>
        <RemoveIcon />
        </Fab>
        <Fab color="secondary" aria-label="add" onClick={addConstraint}>
        <AddIcon />
        </Fab>
      </div>
    </Stack>
  )
}

export default Constraints