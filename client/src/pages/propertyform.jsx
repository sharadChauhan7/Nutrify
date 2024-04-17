import React from 'react'
import question from '../util/formdata.js'
import { useSelector, useDispatch } from 'react-redux';
import { next, prev } from '../features/ListingForm/flow.js'
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
const Type = React.lazy(() => import('../components/form/type.jsx'));
const Location = React.lazy(() => import('../components/form/location.jsx'));
const Basics = React.lazy(() => import('../components/form/basics.jsx'));
const Features = React.lazy(() => import('../components/form/features.jsx'));
const Photos = React.lazy(() => import('../components/form/photos.jsx'));
const Preview = React.lazy(() => import('../components/form/preview.jsx'));
const Title = React.lazy(() => import('../components/form/title.jsx'));
const Description = React.lazy(() => import('../components/form/description.jsx'));
const Price = React.lazy(() => import('../components/form/price.jsx'));
const Skleton= React.lazy(()=>import('../components/skeleton/formskeleton.jsx'));
function Propertyform() {
    let idx = useSelector((state) => state.flow.value);
    let property = useSelector((state) => state.property.property);
    let dispatch = useDispatch();

    const handleSubmit = async () => {
        try {
            let res = await axios.post("http://localhost:3000/property", property);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>

                <Box>
                    <Typography align='center' margin={"40px"} variant='h4'>{question[idx]}</Typography>

                    <Box width={"100%"}>
                        <React.Suspense fallback={<Skleton/>}>
                            {idx === 0 && <Type property={property} />}
                            {idx === 1 && <Location property={property} />}
                            {idx === 2 && <Basics property={property} />}
                            {idx === 3 && <Features property={property} />}
                            {idx === 4 && <Photos property={property} />}
                            {idx === 5 && <Preview property={property} />}
                            {idx === 6 && <Title property={property} />}
                            {idx === 7 && <Description property={property} />}
                            {idx === 8 && <Price property={property} />}
                        </React.Suspense>
                    </Box>
                    <Stack spacing={12} sx={{ my: "24px" }} direction={"row"} justifyContent={"center"}>
                        <Button size='large' variant='contained' disabled={idx === 0} onClick={() => { dispatch(prev()) }}>Prev</Button>
                        {idx!=8?<Button size='large' variant='contained' onClick={() => { dispatch(next()) }}>Next</Button>:<Button size='large' variant='contained' onClick={handleSubmit}>Submit</Button>}
                    </Stack>
                </Box>
            </Container>
        </>
    )
}

export default Propertyform