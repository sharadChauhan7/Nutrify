import { Box, Grid } from '@mui/material'
import React from 'react'
import Card from './propertycard'
import axios from 'axios'
import { nanoid } from '@reduxjs/toolkit'
import Skeleton from '@mui/material/Skeleton';

function Cardcontainer() {
let [allProperties,setAllProperties]=React.useState([{}]);
let [loading,setLoading]=React.useState(true);
    React.useEffect(() => {
        async function getProperties(){
            try{
                let res=await axios.get("http://localhost:3000/property");
                let data=res.data;
                data.forEach((property)=>{
                    property.id=nanoid();
                })
                setAllProperties(data);
                setLoading(false);
            }catch(err){
                console.log(err);
            }
        }
        getProperties();
    }, []);
    console.log(allProperties);

    if(loading){
        // Return Three Skeletons
        return (
            <Box sx={{display:"flex",justifyContent:"center",flexWrap:"wrap", p:{md:"3rem", sm:"2rem", xs:"1rem"}}}>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Skeleton variant="rectangular" width={210} height={118} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                    </Grid>
                </Grid>
            </Box>
        )
    }
  return (
    // Suspense
    <React.Suspense fallback={<div>Loading...</div>}>
    <Box sx={{display:"flex",justifyContent:"center",flexWrap:"wrap", p:{md:"3rem", sm:"2rem", xs:"1rem"}}}>
        <Grid container spacing={5}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                {allProperties.map((property)=>{
                    return <Card key={property.id} property={property}/>
                })}
            </Grid>
        </Grid>
    </Box>
    </React.Suspense>
  )
}

export default Cardcontainer