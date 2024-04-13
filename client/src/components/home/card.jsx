import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import BathtubIcon from '@mui/icons-material/Bathtub';
import HotelIcon from '@mui/icons-material/Hotel';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function card() {
  return (
    <Card sx={{ maxWidth: {md:345,sm:500} }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="220"
          image="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9vbXxlbnwwfHwwfHx8MA%3D%3D"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard Lizard Lizard
          </Typography>
          <Typography variant="body2" guttertop color="text.secondary">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary" display={'flex'} alignItems={'center'}>
                    <HotelIcon sx={{fontSize:"1.2rem", mr:"5px"}} /> 1 Bedroom
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="div" color="text.secondary" display={'flex'} alignItems={'center'}>
                        <BathtubIcon sx={{fontSize:"1.2rem", mr:"5px"}} /> Bathroom
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary" display={'flex'} alignItems={'center'}>
                    <FullscreenIcon sx={{fontSize:"1.2rem", mr:"5px"}} /> 1000 sqft
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary" display={'flex'} alignItems={'center'}>
                    <AttachMoneyIcon sx={{fontSize:"1.2rem", mr:"5px"}} /> 10000/month
                    </Typography>
                </Grid>
            </Grid>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}