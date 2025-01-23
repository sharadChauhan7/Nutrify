import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({modalStat,setOpen}) {
  return (
    <div>
      <Modal
        open={modalStat.open}
        onClose={()=>setOpen({open:false,title:'',subhead:'',description:''})}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className='text-2xl font-semibold text-center my-2 text-orange-500 ' >
            {modalStat.title}
          </p>
          <p className='text-xl text-center font-medium my-2 text-gray-600'>
            {modalStat.description}
          </p>
        </Box>
      </Modal>
    </div>
  );
}
