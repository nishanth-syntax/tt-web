import React from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux'

import { waitingTimerStyle } from './styles'

const WaitingScreen = () => {
    return (
        <Container sx={waitingTimerStyle}>
            <Box sx={{ width: '100%' }}>
                {`00`}
            </Box>
        </Container>
    )
}

export default WaitingScreen;