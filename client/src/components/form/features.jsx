import { Paper, Stack, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';
import React from 'react'

import { features, featureIcon } from '../../util/featuredata.jsx';
import { setFeatures } from '../../features/ListingForm/property.js';


function Features({ property }) {
  let dispatch = useDispatch();
  let [selectedFeatures, setselectedFeatures] = React.useState([...property.features]);

  function handleFeatures(item) {
    if (selectedFeatures.includes(item)) {
      let newFeatures = selectedFeatures.filter((feature) => feature !== item);
      setselectedFeatures(newFeatures);
    } else {
      setselectedFeatures(prev => [...prev, item]);
    }
    dispatch(setFeatures(selectedFeatures));
  }
  return (
    <Stack direction={"row"} flexWrap={"wrap"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "32px", px: "10%" }} >
      {features.map((item, index) => {
        let style = selectedFeatures.includes(item) ? { width: { md: 100 }, height: { md: 100 }, border: "1px solid #2196f3" } : { width: { md: 100 }, height: { md: 100 } };
        return (
          <Paper key={index} elevation={3} sx={style} onClick={() => { handleFeatures(item) }} >
            <Stack key={index} spacing={0} sx={style} direction={"column"} justifyContent={"center"} alignItems={"center"}>
              {featureIcon[item]}
              <Typography variant='h6'>{item}</Typography>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  )
}

export default Features