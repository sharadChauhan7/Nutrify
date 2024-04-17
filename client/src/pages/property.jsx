import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Preview from '../components/form/preview'
import { Container } from '@mui/material';
function Property() {
  const {id} = useParams();
  console.log(id);
  let [property,setProperty]=React.useState({});//[{},{}
  let [loading,setLoading]=React.useState(true);
    React.useEffect(()=>{

        async function getProperty(){
            const property = await axios.get(`http://localhost:3000/${id}`);
            setProperty(property.data);
            setLoading(false);
        }

        {id?getProperty():null}

    },[]);

    if(loading){
        return <h1>Loading...</h1>
    }
        
  return (
    <>
    <Container sx={{mt:"5%"}}>
      <Preview property={property}/>
    </Container>
    </>
  )
}

export default Property